'use client';
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters").max(50),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted:", values);
  }

  return (
    <div className='w-full h-screen bg-[url("/register2.jpg")] bg-cover bg-center gap-10 flex flex-col px-90 py-26'>
      <div className='w-full h-[15vh] flex justify-center items-center'>
        <p className='text-6xl font-bold text-blue-100'>KaizokuDex</p>
      </div>

      <div className="w-[30vw] h-auto p-8 border-2 border-white rounded-2xl bg-transparent text-blue-100 flex flex-col gap-6 shadow-green-50">
        <h2 className="text-4xl text-blue-100 font-bold text-center">Register</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-100">Username</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Enter username"
                      className="w-full px-3 py-2 rounded bg-transparent border  border-green-300 text-blue-100 placeholder-green-300 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-100">Email</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Enter email"
                      className="w-full px-3 py-2 rounded bg-transparent border border-green-300 text-blue-100 placeholder-green-300 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-100">Password</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                      className="w-full px-3 py-2 rounded bg-transparent border  border-green-300 text-blue-100 placeholder-green-300 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-100">Confirm Password</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      type="password"
                      placeholder="Confirm password"
                      className="w-full px-3 py-2 rounded bg-transparent border border-green-300 text-blue-100 placeholder-green-300 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="mt-4 py-2 px-4 rounded bg-green-300 text-white font-semibold hover:bg-green-500 transition"
            >
              Register
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
