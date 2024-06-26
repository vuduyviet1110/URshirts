"use client"

import SignUpForm from "../components/SignUpForm"

export default function SignUpPage() {
    
    return (
        <div className='min-h-screen flex flex-col mt-7 justify-center'>
            <h1 className='text-center mb-6 text-teal-500 text-2xl font-bold'>Hello there, Welcome to our community!</h1>
            <div className='min-w-[400px] flex'>
                <SignUpForm />
            </div>
        </div>
      )
  }