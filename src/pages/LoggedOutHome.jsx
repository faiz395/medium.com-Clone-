import React from "react";
import { Header, Footer, HeroHome } from "@/components/index.js";

function LoggedOutHome() {
  return (
    <>
    <div className="flex  justify-center items-center min-w-[100%] ">
      <div className=" flex flex-col justify-between flex-grow">
        <main className="bg-[#F7F4ED]">
          <HeroHome />
        </main>
      </div>
    </div>
    </>
  );
}

export default LoggedOutHome;
