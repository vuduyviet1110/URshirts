'use server'
import prisma from "@/lib/prismadb"
import { ShirtColor, ShirtFinish, ShirtMaterial, ShirtType } from '@prisma/client'

export type SaveConfigArgs = {
  color: ShirtColor
  finish: ShirtFinish
  material: ShirtMaterial
  type: ShirtType
  configId: string
}

export async function saveConfig({
  color,
  finish,
  material,
  type,
  configId,
}: SaveConfigArgs) {
  await prisma.configuration.update({
    where: { id: configId },
    data: { color, finish, material, type },
  })
}