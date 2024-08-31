import React, { useState } from "react";
import { Container } from "./index.js";
import authService from "@/appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/store/authSlice.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit,formState: { errors } } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const useData = authService.getCurrentUser();
        if (useData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container className={"max-w-[100%] items-center "}>
      {/* <div className=" border-4 border-black"> */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>
        <div>
          {/* {error && error.map((err)=>(<p key={Date.now()} className="text-red-600 text-center">{err}</p>))} */}
          
          
          {error && <p className="text-red-600 text-center">{error}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(create)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-left text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  {...register("name", { required: true })}
                />
              </div>
            </div>
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
                  {...register("email", { required: true ,
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Email address must be a valid address",
                    },
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
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  {...register("password", { required: true, 
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
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Have An Account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-black hover:text-gray-500"
            >
              Signin Here
            </Link>
          </p>
        </div>
      </div>
      {/* </div> */}
    </Container>
  );
}

export default SignupForm;
