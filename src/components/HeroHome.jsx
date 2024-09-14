import React, { useEffect, useState } from "react";
import image from "../assets/bg-1.webp";
import { Container } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function HeroHome() {
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.auth);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  console.log("pritinguserdatafromHeroHome");
  console.log(userData);
  
  useEffect(()=>{
    if(userData.status){
      setIsLoggedIn(true);
    }
    if(isLoggedIn){
      navigate('/home')
    }
  },[userData]);
  

  return (
    <div>
      <div className="lg:max-h-screen flex flex-col justify-between bg-[#F7F4ED] py-5 md:py-4">
        <Container
          classNameChild={"flex flex-col items-start space-y-9 lg: space-y-11"}
          className={" lg:max-h-screen"}
        >
          <div className="block w-[100%]">
            <h2 className="text-[80px] md:text-[95px] md:text-[#242424] lg:text-9xl leading-[72px] md:leading-[95px] lg:leading-[100px] text-left font-serif">
              Human <br></br> stories & ideas
            </h2>
          </div>
          <div>
            <p className="font-serif text-[22px] text-left">
              A place to read, write, and deepen your understanding
            </p>
          </div>
          <div>
            <Link to={isLoggedIn?"/":"/signup"}>
            <button className="text-[22px] font-serif bg-[#1A8917] md:bg-black text-white rounded-full px-[35px] py-[8px] h-auto">
              Start Reading
            </button>
            </Link>
          </div>
        </Container>
      </div>
      <div className="hidden min-w-[100%] max-h-[100%] lg:flex justify-end ">
        <img
          src={`${image}`}
          className="translate-y-[-85%]"
          alt=""
          height="600"
          width="400"
          style={{
            position: "absolute",
            zIndex: "1",
          }}
        />
      </div>
    </div>
  );
}

export default HeroHome;
