'use server'

import prisma from '@/lib/prismadb'

import getCurrentUser from '../(auth)/actions/getCurrentUser'

export const getAuthStatus = async () => {
  const user = await getCurrentUser()

  if (!user?.id || !user.email) {
    throw new Error('Invalid user data')
  }

  const existingUser = await prisma.user.findFirst({
    where: { id: user.id },
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
      },
    })
  }

  return { success: true }
}