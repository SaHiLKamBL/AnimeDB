'use client';

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signinschema } from '@/schemas/signinschema';

const page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof signinschema>>({
    resolver: zodResolver(signinschema)
  });

  const onSubmit = async (data: z.infer<typeof signinschema>) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false // manual redirection
      });

      if (result?.ok) {
        toast.success("Logged in successfully!");
        router.replace(`/home`);
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      toast.error("Something went wrong during sign-in.");
      console.error("SignIn error:", error);
    }
  };

  return (
    <>
      <div className='w-full h-screen bg-[url("/login.webp")] bg-cover bg-center gap-10 flex flex-col px-60 py-20'>
        <div className='w-full h-[15vh] flex justify-center items-center'>
          <p className='text-6xl font-bold text-blue-100'>KaizokuDex</p>
        </div>
        <div className="w-[30vw] h-[50vh] p-8 border-2 border-white rounded-2xl bg-transparent text-blue-100 flex flex-col gap-6 shadow-amber-50">
          <h2 className="text-4xl text-blue-100 font-bold text-center">Login</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-blue-100 text-2xl font-semibold">Email</label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="p-3 rounded-2xl bg-gray-950 border border-amber-300 text-blue-100 placeholder-yellow-300 focus:outline-none focus:ring-0 focus:border-amber-400"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-blue-100 text-2xl font-semibold">Password</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="p-3 rounded-2xl bg-gray-950 border border-amber-300 text-blue-100 placeholder-yellow-300 focus:outline-none focus:ring-0 focus:border-amber-400"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-blue-100">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-amber-300" />
                Remember me
              </label>
              <a href="#" className="hover:underline text-amber-300">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="h-[7vh] text-2xl bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 rounded-2xl transition duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
