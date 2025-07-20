import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import Image from "next/image";
import logoBlack from "@/public/assets/images/logo-black.png";
import logoWhite from "@/public/assets/images/logo-white.png";
import { Button } from "../ui/button";
import { IoMdClose } from "react-icons/io";
import { LuChevronRight } from "react-icons/lu";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b h-14 p-0">
        <div className="flex justify-between item-center px-4">
          <Image
            src={logoBlack}
            height={50}
            width={logoBlack.width}
            className="block dark:hidden h-[50px] w-auto"
            alt="Logo Dark"
          />
          <Image
            src={logoWhite}
            height={50}
            width={logoWhite.width}
            className="hidden dark:block h-[50px] w-auto"
            alt="Logo Dark"
          />
          <Button type="button" size="icon" className="md:hidden">
            <IoMdClose />
          </Button>
        </div>
      </SidebarHeader>
    </Sidebar>
  );
};

export default AppSidebar;
