"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
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
import { LoadingButton } from "@/components/application/LoadingButton";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import Link from "next/link";
import { USER_LOGIN } from "@/routes/UserRoute";
import axios from "axios";
import { carme } from "@/lib/fonts";
import { showToast } from "@/lib/showToast";
import { useRouter } from "next/navigation";

const UpdatePage = ({ email }: { email: string }) => {
  // Needed States
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // select only the required fields for the login form
  const formSchema = zodSchema
    .pick({
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
      email: email,
      password: "",
      confirmPassword: "",
    },
  });

  //to handle form submission for login
  const onHandlePasswordUpdateSubmit = async (
    value: z.infer<typeof formSchema>
  ) => {
    console.log("Registeration Form Submitted", value);

    try {
      setIsLoading(true);
      const { data: passwordUpdate } = await axios.put(
        "/api/auth/reset-password/update-password",
        value
      );

      if (!passwordUpdate.success) {
        throw new Error(passwordUpdate.message);
      }

      form.reset();
      showToast("success", passwordUpdate.message);
      router.push(USER_LOGIN);
    } catch (err) {
      if (err instanceof Error) {
        showToast("error", err.message);
      } else {
        showToast("error", "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* Background Slides */}
      <div>
        <div className="text-center">
          <h1 className="text-3xl font-bold mt-3">Update Passowrd.</h1>
          <p className={`${carme.className} mt-1`}>
            Create a new password by filling the form below.
          </p>
        </div>

        {/* Login Form section  */}
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onHandlePasswordUpdateSubmit)}
              className="mt-6"
            >
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
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-5 top-[43px] text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        {!isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
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
                  text="Update Password"
                  onClick={() => {}}
                  className="w-full text-lg py-5 cursor-pointer"
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdatePage;
