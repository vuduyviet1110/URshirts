"use server"

import getCurrentUser from "@/app/(auth)/actions/getCurrentUser";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import { Order } from "@prisma/client";
import prisma from "@/lib/prismadb"
import { stripe } from "@/lib/stripe";
export const createCheckoutSessions = async({configId,}:{configId:string}) => {
    
    const configuration = await prisma?.configuration.findUnique({
        where: {id: configId}
    })
    
    if(!configuration) throw new Error("Configuration not found")

  const user = await getCurrentUser();
   if(!user){
    throw new Error("You need to be logged in")
   }
   const {finish, material} = configuration
   let price = BASE_PRICE
   if(finish === 'textured') price += PRODUCT_PRICES.finish.textured
   if(material === 'polycarbonate') price += PRODUCT_PRICES.material.polycarbonate
   let order: Order | undefined = undefined
   const existingOrder = await prisma?.order.findFirst({ 
    where:{
        userId:user.id,
        configurationId:configuration.id
    }
   })
   
  if (existingOrder) {
    order = existingOrder
  } else {
    order = await prisma.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
        currency: "usd",
        status: 'awaiting_shipment',
      },
      
    })
  }

  const product = await stripe.products.create({
    name: 'Custom Shirt',
    images: [configuration.imageUrl],
    default_price_data: {
      currency: 'USD',
      unit_amount: price,
    },
    metadata:{custome: 'true'}
  })
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXTAUTH_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/custome/preview?id=${configuration.id}`,
    payment_method_types: ['card'],
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['VN', 'US'] },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  })

  return { url: stripeSession.url }

}