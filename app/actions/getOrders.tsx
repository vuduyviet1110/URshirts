import prisma from "@/lib/prismadb";

export const getOrders = async (user: any) => {
  const orders = await prisma.order.findMany({
    where: { userId: user.id, isPaid:true },
    include: { items: true, configuration: { select:{croppedImageUrl:true,color:true, type:true}},ShippingAddress:{select:{ country:true,city:true, street:true }} },
  });

  return orders;
};