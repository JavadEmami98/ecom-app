import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { login, signup } from "../store/authSlice";

function Auth() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const registeredUsers = useSelector(
    (state) => state.auth.registeredUsers || [],
  );
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") === "login");

  useEffect(() => {
    setIsLogin(searchParams.get("mode") === "login");
  }, [searchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").trim().toLowerCase();

    const userAlreadyExists = registeredUsers.some(
      (user) => user.email === email,
    );

    if (!isLogin && userAlreadyExists) {
      toast.error("شما قبلا با این ایمیل ثبت نام کرده اید.");
      return;
    }

    dispatch(isLogin ? login({ email }) : signup({ email }));
    navigate("/");
  };

  const toggleAuthMode = () => {
    setIsLogin((currentMode) => {
      const nextMode = !currentMode;
      setSearchParams({ mode: nextMode ? "login" : "signup" });
      return nextMode;
    });
  };

  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 text-left shadow-lg"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-950">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {isLogin
              ? "Login to continue shopping."
              : "Create your account to start shopping."}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="rounded-md border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength={6}
              className="rounded-md border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <button
            type="submit"
            className="mt-2 rounded-md bg-gray-950 px-4 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            {isLogin ? "Login" : "Create account"}
          </button>

          <p className="text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleAuthMode}
              className="font-semibold text-emerald-600 transition hover:text-emerald-700"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </main>
  );
}

export default Auth;
