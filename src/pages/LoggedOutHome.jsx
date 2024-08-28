import React from "react";
import { Header, Footer, HeroHome } from "@/components/index.js";

function LoggedOutHome() {
  return (
    <>
      <div className="h-auto py-20 md:py-16  lg:py-24 flex flex-col justify-between bg-[#F7F4ED]">
        <main>
          <HeroHome />
        </main>
      </div>
    </>
  );
}

export default LoggedOutHome;
