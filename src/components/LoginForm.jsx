import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "./index.js";
import { login as authLogin, logout } from "@/store/authSlice.js";
import { useDispatch } from "react-redux";
import authService from "@/appwrite/auth.js";
import { useForm } from "react-hook-form";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit,formState: { errors } } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    // console.log(data);
    try {
      const session = await authService.login(data);
      // console.log(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        // console.log('In Login.jsx userData is '+userData+" session is "+session);
        // console.log(userData);
        // console.log(session);
        if (userData) {
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}

      <Container className={"w-auto"}>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div>
            {/* {errors && <p className="text-red-600 text-center">{errors}</p>} */}
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(login)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-left text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Email address must be a valid address",
                      },
                      // validate: {
                      //   matchPatern: (value) =>
                      //     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                      //       value
                      //     ) || "Email address must be a valid address",
                      // },
                    })}
                  />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-black-600 hover:text-gray-500"
                    >
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:/^.{8,}$/,
                        message:
                          "Password must be at least 8 characters long",
                      },
                    })}
                  />
                   {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not Registered?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-black hover:text-gray-500"
              >
                Signup Here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default LoginForm;
