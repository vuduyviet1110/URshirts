'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getAuthStatus } from './actions'
import { useRouter } from 'next/navigation'
import { BiLoader } from 'react-icons/bi'
import { revalidatePath } from 'next/cache'


const Page = () => {
  const [configId, setConfigId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const configurationId = localStorage.getItem('configurationId')
    if (configurationId) setConfigId(configurationId)
  }, [])

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  })

  if (data?.success) {
    if (configId) {
    router.push(`/custome/preview?id=${configId}`)
    router.refresh()
    localStorage.removeItem('configurationId')
    } else {
      router.push('/')
    }
  }

  return (
    <div className='w-full min-h-screen mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <BiLoader className='h-8 w-8 animate-spin text-zinc-500' />
        <h3 className='font-semibold text-xl'>Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  )
}

export default Page