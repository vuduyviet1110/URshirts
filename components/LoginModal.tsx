import type { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import Image from 'next/image'
import { Button, buttonVariants } from './ui/button'
import Link from 'next/link'

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className='absolute z-[9999999]'>
        <DialogHeader>
          <div className='relative mx-auto w-24 h-24 mb-2'>
            <h2 >URshirt</h2>
            <Image
              src='/logoUrshirts.jpg'
              alt='URshirt image'
              className='object-contain'
              fill
            />
          </div>
          <DialogTitle className='text-3xl text-center font-bold tracking-tight text-gray-900'>
            Log in to continue
          </DialogTitle>
          <DialogDescription className='text-base text-center py-2'>
            <span className='font-medium text-zinc-900'>
              Your configuration was saved!
            </span>{' '}
            Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-6 divide-x  divide-gray-200'>
          <Button className={buttonVariants({ variant: 'outline' })}>
            <Link href='/sign-in' className='text-gray-900'> Sign in</Link>
          </Button>
          <Button className={buttonVariants({ variant: 'outline' })}>
            <Link href='/sign-up'className='text-gray-900'> Sign up</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal