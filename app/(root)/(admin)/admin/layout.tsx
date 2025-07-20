import AppSidebar from "@/components/admin/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

const Adminlayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="">{children}</main>;
    </SidebarProvider>
  );
};

export default Adminlayout;
