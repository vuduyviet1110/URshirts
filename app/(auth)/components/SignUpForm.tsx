"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createUser } from "../actions/authActions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast';
const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    confirmPassword: z.string().min(6).max(100)
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export default function SignUpForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        
        const formData = new FormData();
        (Object.keys(values) as Array<keyof typeof values>).forEach((key) => {
          formData.append(key, values[key]);
        });
        const result = await createUser(formData);
        
        if (result?.existingUser) {
            toast.error(result.existingUser);
        } else {
          
          toast.success("Welcome! Please Sign In");
          router.push("/sign-in");
        }
    } catch (error) {
        console.log(error)
    }
   
  }

  useEffect(() => {
    if (status === "authenticated") {
        toast.success("You are already signed in!");
      router.push("/");
    }
  }, [status, router]);

  return (
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 mx-auto min-w-[300px]">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            className="inline-flex items-center text-sm font-medium transition ease-in-out delay-50 px-1 text-slate-950 hover:translate-x-4 hover:scale-110 py-1  hover:text-zinc-400 duration-200"
            href="/sign-in"
          >
            <div className="">Login</div>
            <div className="p-x-1 mx-2">
              <FaArrowRight />
            </div>
          </Link>
        </span>
        <Button type="submit">Sign up 🚀</Button>
      </form>
    </Form>
  );
}
