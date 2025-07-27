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
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const create = async (data) => {
    setError("");
    setIsLoading(true); // Set loading state to true
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const useData = authService.getCurrentUser();
        if (useData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  const password = watch("password");

  return (
    <Container className={"max-w-[100%] items-center "}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>
        <div>
          {error && <p className="text-red-600 text-center">{error}</p>}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(create)} className="space-y-6">
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
                    required: "Email is required",
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
                      value: /^.{8,}$/,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-left text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  {...register("confirmPassword", {
                    validate: value => value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading} // Disable button during loading
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-500"
                }`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
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
    </Container>
  );
}

export default SignupForm;
