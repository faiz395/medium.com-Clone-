import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LoggedOutHome,
  Signup,
  AddPost,
  EditPost,
  Post,
  AllPosts,
  LoggedInHome,
  About,
  Privacy,
  Terms,
  EditProfilePage,
  SearchPage,
} from "./pages/index.js";
import { AuthLayout, LoginForm as Login } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthLayout authentication={false}><LoggedOutHome /></AuthLayout>,
      },
      {
        path: "/home",
        element: <AuthLayout authentication={true} ><LoggedInHome /></AuthLayout>,
      },
      {
        path: "/login",
        element: <AuthLayout authentication={false} ><Login /></AuthLayout>,
      },
      {
        path: "/signup",
        element: <AuthLayout authentication={false}><Signup /></AuthLayout>,
      },
      {
        path: "/all-posts",
        element: <AuthLayout authentication={true} ><AllPosts /></AuthLayout>,
      },
      {
        path: "/add-post",
        element: <AuthLayout authentication={true} ><AddPost /></AuthLayout>,
      },
      {
        path: "/edit-post/:slug",
        element: <AuthLayout authentication={true} ><EditPost /></AuthLayout>,
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/edit-profile",
        element: <AuthLayout authentication={true} ><EditProfilePage /></AuthLayout>,
      },
      {
        path: "/search",
        element: <AuthLayout authentication={true} ><SearchPage /></AuthLayout>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);