import React from "react";

function Container({ children, className, classNameChild }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`w-full max-w-[80%] ${classNameChild}`}>{children}</div>
    </div>
  );
}

export default Container;
