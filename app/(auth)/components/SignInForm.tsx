'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
const formSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
});

export default function SignUpForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      (Object.keys(values) as Array<keyof typeof values>).forEach(key => {
        formData.append(key, values[key]);
      });
      const result = await signIn('credentials', { redirect: false, ...values });
      if (result?.error) {
        throw new Error(result?.error);
      } else {
        toast.success('Successfully Signed In');
        router.push('/auth-callback');
      }
    } catch (error) {
      console.log(error);
      toast.error('Sign In failed');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 mx-auto min-w-[300px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <span className="text-sm text-gray-700">
          Have not an account yet?{' '}
          <Link
            className="inline-flex items-center text-sm font-medium transition ease-in-out delay-50 px-1 text-slate-950 hover:translate-x-4 hover:scale-110 py-1  hover:text-zinc-400 duration-200"
            href="/sign-in"
          >
            <div className="">Sign Up</div>
            <div className="p-x-1 mx-2">
              <FaArrowRight />
            </div>
          </Link>
        </span>
        <Button type="submit">Sign In 🚀</Button>
      </form>
    </Form>
  );
}
