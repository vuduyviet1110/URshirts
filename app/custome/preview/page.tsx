import { notFound } from 'next/navigation'
import DesignPreview from './DesignPreview'
import prisma from '@/lib/prismadb'
import getCurrentUser from '@/app/(auth)/actions/getCurrentUser'
interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams
  const user = await getCurrentUser()
  if (!id || typeof id !== 'string') {
    return notFound()
  }

  const configuration = await prisma.configuration.findUnique({
    where: { id },
  })

  if(!configuration) {
    return notFound()
  }

  return <DesignPreview configuration={configuration} user={user!} />
}

export default Page