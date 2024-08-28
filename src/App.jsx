import "./App.css";
import { useEffect, useState } from "react";
import {
  AuthLayout,
  Container,
  Footer,
  Header,
  HeroHome,
  Loader,
  LoggedInNav,
  LoginForm,
  PostCard,
  TinyMCE,
} from "./components/index";
import { logout, login } from "./store/authSlice";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoggedOutHome, Post } from "./pages/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // setLoading(true);
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (!loading) ? (
    <div className="h-auto"> 
      <Header/>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
}

export default App;
