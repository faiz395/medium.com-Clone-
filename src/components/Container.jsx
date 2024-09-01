import React from "react";

function Container({ children, className, classNameChild, widthOfContainer='max-w-[80%]' }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`w-full ${widthOfContainer} ${classNameChild}`}>{children}</div>
    </div>
  );
}

export default Container;
