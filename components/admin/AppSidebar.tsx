"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import Image from "next/image";
import logoBlack from "@/public/assets/images/logo-black.png";
import logoWhite from "@/public/assets/images/logo-white.png";
import { Button } from "../ui/button";
import { IoMdClose } from "react-icons/io";
import { LuChevronRight } from "react-icons/lu";
import { AdminAppSidebarMenu } from "@/lib/adminSidebarMenu";
import { ServerInsertedMetadataContext } from "next/dist/shared/lib/server-inserted-metadata.shared-runtime";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import Link from "next/link";
import { carme } from "@/lib/fonts";

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar className="z-50">
      <SidebarHeader className="border-b h-18 p-2">
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
          <Button
            type="button"
            size="icon"
            className="md:hidden mt-2"
            onClick={toggleSidebar}
          >
            <IoMdClose />
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className={`p-3 ${carme.className} tracking-wider`}>
        <SidebarMenu>
          {AdminAppSidebarMenu.map((menu, index) => (
            <Collapsible key={index} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    className="font-semibold text-md px-2 py-5 "
                  >
                    <Link href={menu?.url}>
                      <menu.icon />
                      {menu.title}

                      {menu.subMenu && menu.subMenu.length > 0 && (
                        <LuChevronRight className="ml-auto transition-transform duration-200 group-data-[state=opp]/collapsible:rotate-90" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {menu.subMenu && menu.subMenu.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.subMenu.map((submenuItem, submenuIndex) => (
                        <SidebarMenuItem key={submenuIndex}>
                          <SidebarMenuSubButton
                            asChild
                            className=" px-2 py-5 text-md tracking-wide"
                          >
                            <Link href={submenuItem.url}>
                              {submenuItem.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
