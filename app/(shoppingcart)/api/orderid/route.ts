import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prismadb"

export async function GET(req: NextRequest) {
  try {
    const latestOrder = await prisma.order.findFirst({
      orderBy: {
        createdDate: "desc"
      },
      select: {
        id: true
      }
    })

    if (!latestOrder){
      return NextResponse.json({ message: "No orders found" }, { status: 404 })
    }
    
    return NextResponse.json({ orderId: latestOrder.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}