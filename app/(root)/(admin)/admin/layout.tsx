import AppSidebar from "@/components/admin/AppSidebar";
import ThemeProvider from "@/components/admin/ThemeProvider";
import TopBar from "@/components/admin/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { carme } from "@/lib/fonts";
import React, { ReactNode } from "react";

const Adminlayout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="md:w-[calc(100vw-16rem)] ">
          <div
            className={`px-7 min-h-[calc(100vh-40px)] pb-10 pt-[80px]  ${carme.className} tracking-wide antialiased`}
          >
            <TopBar />
            {children}
          </div>
          <footer className="border-t h-[40px] flex justify-center items-center bg-gray-50 dark:bg-background text-md">
            © 2025, Adarsh Thakare ™. All rights reserved!
          </footer>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Adminlayout;
