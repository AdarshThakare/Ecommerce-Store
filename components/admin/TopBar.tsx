"use client";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import UserDropDown from "./UserDropDown";
import { Button } from "../ui/button";
import { RiMenu4Fill } from "react-icons/ri";
import { useSidebar } from "../ui/sidebar";

const TopBar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <nav className="fixed border h-18 w-full top-0 left-0 z-30 md:ps-70 md:pe-6 px-5 flex justify-between items-center bg-white dark:bg-card">
      <div className="">Search Component WireFrame</div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserDropDown />
        <Button
          onClick={toggleSidebar}
          type="button"
          size="icon"
          className="ms-2 md:hidden"
        >
          <RiMenu4Fill />
        </Button>
      </div>
    </nav>
  );
};

export default TopBar;
