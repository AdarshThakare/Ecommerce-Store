"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { use } from "react";
import Logo from "@/public/assets/images/logo-black.png";
import Image from "next/image";
import { carme } from "@/app/layout";
import { useForm } from "react-hook-form";
import zodSchema from "@/lib/zodSchema";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const page = () => {
  // select only the required fields for the login form
  const formSchema = zodSchema.pick({
    email: true,
    password: true,
  });

  // use the form schema with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Card>
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
          <h1 className="text-3xl font-bold mt-3">Login Into Account</h1>
          <p className={`${carme.className} mt-1`}>
            Log into your account by filling the form below.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default page;
