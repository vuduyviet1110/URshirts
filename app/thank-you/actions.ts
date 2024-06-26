'use server'

import getCurrentUser from "../(auth)/actions/getCurrentUser"
import prisma from '@/lib/prismadb'


export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
  
  const user = await getCurrentUser()

  if (!user?.id || !user.email) {
    throw new Error('You need to be logged in to view this page.')
  }

  const order = await prisma.order.findFirst({
    where: { id: orderId, userId: user.id },
    include: {
      BillingAddress: true,
      configuration: true,
      ShippingAddress: true,
      user: true,
    },
  })

  if (!order) throw new Error('This order does not exist.')

  if (order.isPaid) {
    return order
  } else {
    return false
  }
}