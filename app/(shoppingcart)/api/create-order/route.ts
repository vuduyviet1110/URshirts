import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/(auth)/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import Stripe from "stripe";
import { CartEntry } from "use-shopping-cart/core";
import { OrderStatus, Prisma } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
  typescript: true,
});

type OrderCreateInputCustom = Omit<Prisma.OrderCreateInput, 'configuration'> & {
  configuration?: Prisma.ConfigurationCreateNestedOneWithoutOrderInput;
};

const manageStripePaymentIntent = async (payment_intent_id: string, total: number) => {
  if (payment_intent_id) {
    return await stripe.paymentIntents.update(payment_intent_id, { amount: total });
  }

  return await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });
};

const manageOrderInDB = async (paymentIntent: any, total: number, items: CartEntry[], userId: string) => {
  const existingOrder = await prisma.order.findUnique({
    where: { paymentIntentId: paymentIntent.id },
  });

  if (existingOrder) {
    return await prisma.order.update({
      where: { paymentIntentId: paymentIntent.id },
      data: { userId, amount: total, currency: "usd", status: "awaiting_shipment" },
    });
  }

  const baseOrderData: OrderCreateInputCustom = {
    amount: total,
    currency: "usd",
    status: OrderStatus.awaiting_shipment,
    paymentIntentId: paymentIntent.id,
    configuration: items[0]?.configuration || undefined,
    user: {
      connect: { id: userId },
    },
  };

  // let orderData: OrderCreateInputCustom;

  // if (configurationId) {
  //   orderData = {
  //     ...baseOrderData,
  //     configuration: {
  //       connect: { id: configurationId },
  //     },
  //   };
  // } else {
  //   orderData = baseOrderData;
  // }

  const createdOrder = await prisma.order.create({
    data: baseOrderData as Prisma.OrderCreateInput,
  });

  const orderItems = items.map(async (item) => {
    await prisma.orderItem.create({
      data: {
        order: { connect: { id: createdOrder.id } },
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        size: item.size,
      },
    });
  });

  await Promise.all(orderItems);
  return createdOrder;
};

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "not signed in" }, { status: 403 });
  }

  const userId = user.id;
  const body = await req.json();
  const { items, payment_intent_id, totalAmount } = body;
  const total = totalAmount;

  try {
    const paymentIntent = await manageStripePaymentIntent(payment_intent_id, total);
    if (paymentIntent) {
      const order = await manageOrderInDB(paymentIntent, total, items, userId);
      return NextResponse.json({ paymentIntent, order });
    } else {
      return NextResponse.json({ error: "no intent ID found" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "internal server error" }, { status: 500 });
  }
}