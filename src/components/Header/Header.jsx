import React, { useEffect, useState } from "react";
import { Container, DangerToster, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "@/appwrite/auth";
import userProfileSlice from "@/store/userProfileSlice.js";
import service from "@/appwrite/config";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [currUserProfile, setCurrUserProfile] = useState({});
  const [currProfileActive,setCurrProfileActive]=useState(true);
  const classVal = !authStatus ? `bg-[#F7F4ED]` : `w-full`;
  const widthOfContainer = authStatus
    ? "max-sm:max-w-[100%] px-2"
    : "max-w-[80%]";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userDetails = useSelector((state) => state.auth);
  const userProfileDetails = useSelector((state) => state.userProfile);
  
  useEffect(() => {
    const val = userProfileDetails.filter(
      (data) => data?.userId == userDetails?.userData?.$id
    );
    console.log("userPrfolifromloggedinnavis: ", val);
    setCurrUserProfile(val[0]);
    const finalVal= val[0];
    if(!finalVal?.userName || !finalVal?.bio || !finalVal?.pronoun || !finalVal?.featuredImage){
      setCurrProfileActive(false);
    }
    else{
      setCurrProfileActive(true);
    }
  }, [currUserProfile, userProfileDetails,currProfileActive,authStatus]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Container
      className={`z-10 ${classVal}`}
      widthOfContainer={widthOfContainer}
    >
      <div
        className={`min-w-full h-auto  border-black ${
          !authStatus ? `border-b-2` : ""
        }`}
      >
        {(authStatus && !currProfileActive) && <DangerToster/>}
          
        <nav className="flex items-center justify-between my-3 px-4">
          {/* Left side: Logo and Search */}
          <div className="flex items-center space-x-4">
            <Link to={authStatus ? "/home" : "/"}>
              <h2 className="font-bold font-serif text-[30px] ">Medium</h2>
            </Link>
            {authStatus && (
              <Link className="md:hidden" to={"/search"}>
                <div className="flex items-center space-x-2 bg-white p-1 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-label="Search"
                    className="flex-shrink-0"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </Link>
            )}
          </div>

          {/* Right side: Profile Image and Dropdown */}
          <div className="flex items-center space-x-4">
            {!authStatus && (
              <>
                <Link
                  to="/about"
                  className="hidden md:flex text-[14px] font-serif"
                >
                  Our Story
                </Link>
                <Link
                  to="/login"
                  className="hidden md:flex text-[14px] font-serif"
                >
                  Write
                </Link>
                <Link
                  to="/login"
                  className="hidden sm:flex text-[14px] font-serif"
                >
                  Sign in
                </Link>
                <Link to="/signup">
                  <button className="text-[14px] font-serif bg-black text-white rounded-2xl px-[16px] py-[8px] h-auto inline-block">
                    Get Started
                  </button>
                </Link>
              </>
            )}
            {authStatus && (
              <>
                <Link className="max-md:hidden" to={"/search"}>
                  <div className="flex items-center space-x-2 bg-white p-1 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-label="Search"
                      className="flex-shrink-0"
                    >
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </Link>
                <Link to="/add-post" className="flex items-center space-x-2">
                  <div className="md:hidden flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-label="Write"
                    >
                      <path
                        fill="currentColor"
                        d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
                      ></path>
                      <path
                        stroke="currentColor"
                        d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
                      ></path>
                    </svg>
                  </div>
                  <div className="text-[14px] hidden md:flex items-center space-x-1 font-serif">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-label="Write"
                    >
                      <path
                        fill="currentColor"
                        d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
                      ></path>
                      <path
                        stroke="currentColor"
                        d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
                      ></path>
                    </svg>
                    <span>Write</span>
                  </div>
                </Link>
                <div className="relative">
                  <img
                    src={service.getFilePreview(
                      currUserProfile?.featuredImage || "66e7c497002e325e378a"
                    )}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-20"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <Link
                        to={"/edit-profile"}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Edit Profile
                      </Link>
                      <LogoutBtn className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors" />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </nav>
      </div>
    </Container>
  );
}

export default Header;
