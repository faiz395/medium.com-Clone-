import React from "react";
import { Container } from "../index";
import authService from "@/appwrite/auth";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// border-4 w-[100%]
function Footer() {
  const authStatus = useSelector((state) => state.auth.status);
  const classVal = !authStatus ? `bg-[#F7F4ED]` : ``;
  return (
    <>
      <Container className={`z-10 ${classVal}`}>
        <div className="min-w-[100%] h-[75px] border-t-2 border-black">
          <nav className="min-w-[100%] flex items-center align-middle justify-center my-6 space-x-4 ">
            <div className="text-[13px] font-serif text-[#6B6B6B] font-light">
              <Link to="/about">About</Link>
            </div>

            <div className="text-[13px] font-serif text-[#6B6B6B] font-light">
              <Link to="/privacy">Privacy</Link>
            </div>
            <div className="text-[13px] font-serif text-[#6B6B6B] font-light">
              <Link to="/terms">Terms</Link>
            </div>
          </nav>
        </div>
      </Container>
    </>
  );
}

export default Footer;
