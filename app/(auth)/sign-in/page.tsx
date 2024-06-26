"use client"
import SignIn from "@/app/(auth)/components/SignInForm"
export default function SignInPage() {
    
    return (
        <div className='min-h-screen flex flex-col mt-7 justify-center'>
            <h1 className='text-center mb-6 text-teal-500 text-2xl font-bold'>Welcome back, interesting features are waiting for you!</h1>
            <div className='min-w-[400px] flex'>
                <SignIn  />
            </div>
        </div>
      )
  }