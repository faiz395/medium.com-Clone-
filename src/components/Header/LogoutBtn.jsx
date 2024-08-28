import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="text-[14px] font-serif bg-black text-white rounded-2xl px-[16px] py-[8px] h-auto inline-block"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
