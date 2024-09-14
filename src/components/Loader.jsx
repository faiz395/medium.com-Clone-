import React from "react";

function Loader({ isTrue = false,minheight=`min-h-screen` }) {
  if(isTrue){
    return(
        <div className={`flex items-center justify-center ${minheight}`}>
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] text-black dark:text-white">
              Loading...
            </span>
          </div>
        </div>
      )
  }
  return null;
}

export default Loader;
