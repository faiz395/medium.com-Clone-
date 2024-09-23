import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/");
    } else if (!authentication && authStatus) {
      navigate("/home");
    }
  }, [authStatus, navigate, authentication]);

  return <>{children}</>;
}

export default AuthLayout;