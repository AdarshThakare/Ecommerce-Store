"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { use, useState } from "react";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { carme } from "@/app/layout";
import { useForm } from "react-hook-form";
import zodSchema from "@/lib/zodSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/application/LoadingButton";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { USER_LOGIN, USER_REGISTER } from "@/routes/UserRoute";

const RegisterPage = () => {
  // Needed States
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // select only the required fields for the login form
  const formSchema = zodSchema
    .pick({
      name: true,
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password and Confirm Password fields must be the same.",
      path: ["confirmPassword"],
    });

  // use the form schema with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  //to handle form submission for login
  const onHandleRegisterSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log("Registeration Form Submitted", value);
  };
  return (
    <>
      {/* Background Slides */}
      <div className="bg-slide-register"></div>
      <div className="bg-slide-register bg2"></div>
      <div className="bg-slide-register bg3"></div>
      <Card className="opacity-80 ">
        <CardContent>
          <div className="flex justify-center">
            <Image
              src={Logo}
              alt="Logo"
              height={100}
              width={100}
              className="w-[150px]"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mt-3">Create an Account</h1>
            <p className={`${carme.className} mt-1`}>
              Create new account by filling the form below.
            </p>
          </div>

          {/* Login Form section  */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onHandleRegisterSubmit)}
                className="mt-6"
              >
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={`${carme.className} text-md tracking-wider`}
                        >
                          Full Name -
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your name"
                            className={`${carme.className} text-md tracking-wide `}
                            {...field}
                          />
                        </FormControl>
                        {/* To display validation messages */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={`${carme.className} text-md tracking-wider`}
                        >
                          Email -
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className={`${carme.className} text-md tracking-wide `}
                            {...field}
                          />
                        </FormControl>
                        {/* To display validation messages */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-5 relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={`${carme.className} text-md `}>
                          Password -
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="Enter your password"
                            className={`${carme.className} text-md `}
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                          className="absolute right-5 top-[43px] text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          {!isPasswordVisible ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaRegEye />
                          )}
                        </button>
                        {/* To display validation messages */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-3">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className={`${carme.className} text-md tracking-wider`}
                        >
                          Confirm Password -
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            className={`${carme.className} text-md tracking-wide `}
                            {...field}
                          />
                        </FormControl>

                        {/* To display validation messages */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <LoadingButton
                    isLoading={isLoading}
                    type="submit"
                    text="Register"
                    onClick={() => {}}
                    className="w-full text-lg py-5 cursor-pointer"
                  />
                </div>
                <div className={`mt-4 text-center ${carme.className}`}>
                  <p>Already have an Account ?</p>
                  <Link
                    href={USER_LOGIN}
                    className="text-primary ml-3 hover:font-semibold hover:underline"
                  >
                    Login to Account
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterPage;
