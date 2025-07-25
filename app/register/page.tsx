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
import { formSchema } from '@/schemas/signupschema';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post('/api/sign-up', values);
      if (response.status === 200 || response.status === 201) {
        toast.success("You have signed up successfully!");
        router.push(`/login`);
      } else {
        toast.error("Sign up failed. Please try again.");
      }
    } catch (error) {
      toast.error("Sign up failed.");
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-full h-screen overflow-y-auto bg-black pt-8 bg-[url('/loginimage.webp')] bg-center bg-cover flex flex-col items-center">
        <div className="w-full justify-center items-center h-32 flex px-20">
          <h1 className="text-6xl font-bold text-white">KaizokuDex</h1>
        </div>
        <div className="w-[30vw] max-h-[80vh] overflow-y-auto p-8 border-2 border-white rounded-2xl bg-transparent text-white flex flex-col gap-6  [&::-webkit-scrollbar]:hidden">
          <h2 className="text-4xl text-white font-bold text-center">Register</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-100 text-2xl">Username</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Enter username"
                        className="w-full px-3 py-2 rounded bg-transparent border border-red-500 text-white placeholder-white focus:outline-none"
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
                    <FormLabel className="text-blue-100 text-2xl">Email</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Enter email"
                        className="w-full px-3 py-2 rounded bg-transparent border border-red-500 text-white placeholder-white focus:outline-none"
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
                    <FormLabel className="text-blue-100 text-2xl">Password</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="password"
                        placeholder="Enter password"
                        className="w-full px-3 py-2 rounded bg-transparent border border-red-500 text-white placeholder-white focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-100 text-2xl">Confirm Password</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        type="password"
                        placeholder="Confirm password"
                        className="w-full px-3 py-2 rounded bg-transparent border border-red-500 text-white placeholder-white focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="mt-4 py-2 px-4 text-2xl rounded bg-red-500 text-white font-semibold hover:bg-red-700 transition"
              >
                Register
              </button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Page;
