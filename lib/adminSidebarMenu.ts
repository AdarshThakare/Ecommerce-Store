import { ADMIN_DASHBOARD } from "@/routes/AdminRoute";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";
import { LuUserRound } from "react-icons/lu";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";

export const AdminAppSidebarMenu = [
  {
    title: "Dashboard",
    url: ADMIN_DASHBOARD,
    icon: AiOutlineDashboard,
  },
  {
    title: "Category",
    url: "#",
    icon: BiCategory,
    subMenu: [
      {
        title: "Add Category",
        url: "#",
      },
      {
        title: "All Categories",
        url: "#",
      },
    ],
  },
  {
    title: "Products",
    url: "#",
    icon: IoShirtOutline,
    subMenu: [
      {
        title: "Add Product",
        url: "#",
      },
      {
        title: "Add Product Variant",
        url: "#",
      },
      {
        title: "All Products",
        url: "#",
      },
      {
        title: "All Product Variants",
        url: "#",
      },
    ],
  },
  {
    title: "Coupons",
    url: "#",
    icon: RiCoupon2Line,
    subMenu: [
      {
        title: "Add Coupon",
        url: "#",
      },
      {
        title: "All Coupons",
        url: "#",
      },
    ],
  },
  {
    title: "Orders",
    url: "#",
    icon: MdOutlinePermMedia,
  },
  {
    title: "Customers",
    url: "#",
    icon: LuUserRound,
  },
  {
    title: "Rating & Review",
    url: "#",
    icon: IoMdStarOutline,
  },
  {
    title: "Media",
    url: "#",
    icon: MdOutlinePermMedia,
  },
];
