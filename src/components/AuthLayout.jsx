import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.status);
  // Adding a loading state to avoid premature redirect
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   // Set loading to false once authStatus is resolved
  //   if (authStatus !== undefined) {
  //     setLoading(false);
  //   }
  // }, [authStatus]);

  useEffect(() => {
    // Only check authentication after the loading is complete
    if (authentication && !authStatus) {
      navigate("/", { state: { from: location } });
    }
    // if (!loading) {
    // }
  }, [authStatus, navigate, location, authentication, loading]);

  // Show a loader or blank screen while loading the auth status
  // if (loading) return "null";

  return <>{children}</>;
}

export default AuthLayout;
