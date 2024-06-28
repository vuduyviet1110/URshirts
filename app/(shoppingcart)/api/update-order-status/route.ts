import prisma from "@/lib/prismadb"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {orderId, isPaid} = body

  try {
    const updatedOrder = await prisma.order.update({
      where: {id: orderId},
      data: {isPaid}
    })

    return NextResponse.json({updatedOrder})
  } catch (error) {
    console.error(error)
    return
  }
}