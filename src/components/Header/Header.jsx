import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "@/appwrite/auth";
import { logout } from "@/store/authSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const classVal = !authStatus?(`bg-[#F7F4ED]`):(``);

  return (
    // border-4 w-[100%]
    <>
      <Container className={`z-10 ${classVal}`}>
        <div className="min-w-[100%] h-[75px] border-b-2 border-black ">
          <nav className="flex items-center justify-between my-3 ">
            <div className="flex justify-start items-center w-[30%] space-x-4 md:space-x-6">
              <Link to="/">
                <h2 className="font-bold font-serif text-[30px]">Medium</h2>
              </Link>
              {authStatus && (
                <div>
                  <div className="hidden md:hidden">S</div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="p-1 hidden"
                  />
                </div>
              )}
            </div>
            {/* Apply map from here */}
            <div className="flex justify-end items-center w-[70%] space-x-6 py-2">
              {!authStatus && (
                <>
                  <div className="text-[14px] font-serif hidden md:flex justify-center align-middle ">
                    <Link to="/about">Our Story</Link>
                  </div>
                  
                  <div className="text-[14px] font-serif hidden md:flex">
                    <Link to="/login">Write</Link>
                  </div>
                  <div className="text-[14px] hidden sm:flex font-serif">
                    <Link to="/login">Sign in</Link>
                  </div>
                  <div>
                    <Link to="/signup">
                      <button className="text-[14px] font-serif bg-black text-white rounded-2xl px-[16px] py-[8px] h-auto inline-block">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </>
              )}
              {authStatus && (
                <>
                  <Link to="/add-post">
                  <div className="md:hidden"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write"><path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path><path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path></svg></div>
                  <div className="text-[14px] lg:flex lg:space-x-1 font-serif hidden md:block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write"><path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path><path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path></svg><span>Write
                    </span>
                  </div>
                  </Link>
                  <div>
                  <LogoutBtn/>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </Container>
    </>
  );
}

export default Header;
