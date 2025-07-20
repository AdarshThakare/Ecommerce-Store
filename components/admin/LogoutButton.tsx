import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { carme } from "@/lib/fonts";
import { AiOutlineLogout } from "react-icons/ai";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "@/store/reducer/authReducer";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/UserRoute";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const { data: logoutResponse } = await axios.post("/api/auth/logout");
      if (!logoutResponse) {
        throw new Error(logoutResponse.message);
      }

      dispatch(logout(null));
      router.push(WEBSITE_LOGIN);
      showToast("success", logoutResponse.message);
    } catch (err) {
      if (err instanceof Error) {
        showToast("error", err.message);
      } else {
        showToast("error", "An unexpected error occurred.");
      }
    }
  };
  return (
    <DropdownMenuItem
      onClick={handleLogout}
      className={`cursor-pointer text-red-500  ${carme.className} antialiased`}
    >
      <AiOutlineLogout color="red" /> Logout
    </DropdownMenuItem>
  );
};

export default LogoutButton;
