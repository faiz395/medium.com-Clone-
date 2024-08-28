import React from "react";
import { Container } from "../index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LoggedInNav() {
  // const element = <FontAwesomeIcon icon="fa-solid fa-house" />

  return (
    <>
      <Container className={"z-10 bg-[#F7F4ED]"}>
        <div className="min-w-[100%] h-[75px] border-b-2 border-black ">
          <nav className="flex items-center justify-center my-3 ">
            <div className="flex justify-start items-center w-[50%] space-x-4 md:space-x-6">
              <div>
                <h2 className="font-bold font-serif text-[20px] md:text-[30px]">
                  Medium
                </h2>
              </div>
              <div>
                <div className="md:hidden">S</div>
                <input
                  type="text"
                  placeholder="Search"
                  className="p-1 hidden md:block"
                />
              </div>
            </div>
            {/* logo above */}
            <div className="flex justify-end items-center w-[50%] space-x-4 md:space-x-6 py-2">
              <div className="md:hidden">W</div>
              <div className="text-[14px] font-serif hidden md:block">
                Write
              </div>
              <div>
                <button className="text-[14px] font-serif bg-black text-white rounded-2xl px-[16px] py-[8px] h-auto inline-block">
                  Profile
                </button>
              </div>
            </div>
          </nav>
        </div>
      </Container>
    </>
  );
}

export default LoggedInNav;
