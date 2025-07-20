"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import adminLogo from "@/public/assets/images/profile.png";
import { useSelector } from "react-redux";
import { carme } from "@/lib/fonts";
import Link from "next/link";
import { IoShirtOutline } from "react-icons/io5";
import LogoutButton from "./LogoutButton";

const UserDropDown: React.FC = () => {
  const auth = useSelector((store: any) => store.authStore.auth);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={adminLogo.src} />
          <AvatarFallback>AT</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="me-5 w-44">
        <DropdownMenuLabel>
          <p className={`font-semibold ${carme.className} text-md`}>
            {auth?.name}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href=""
            className={`font-semibold ${carme.className} text-md cursor-pointer`}
          >
            <IoShirtOutline /> New Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href=""
            className={`font-semibold ${carme.className} text-md cursor-pointer`}
          >
            <IoShirtOutline /> Orders
          </Link>
        </DropdownMenuItem>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
