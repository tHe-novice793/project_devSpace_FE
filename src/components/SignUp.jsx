import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect if already logged in
  useEffect(() => {
    if (userData?.data?.id) {
      navigate("/feed");
    }
  }, [userData, navigate]);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setIsPasswordVisible((v) => !v);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setSuccessMsg("");
  };

  // Handle Enter key navigation
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef?.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleSignup = async () => {
    setError("");
    setSuccessMsg("");
    const { firstName, lastName, emailId, password } = formData;

    if (!firstName || !lastName || !emailId || !password) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        console.log(res.data.data)
        dispatch(addUser(res.data.data))
        setSuccessMsg(res.data.message || "Signup successful! Redirecting...");
        setTimeout(() => navigate("/feed"), 2000);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong during signup. Try again later!"
      );
    }
  };

  return (
    <div>
      <div className="w-full max-w-md mx-auto">
        <fieldset className="bg-white text-black shadow-lg rounded-lg p-6 w-full">
          {/* 
          <legend className="text-xl font-semibold mt-6 mb-6">Sign Up</legend> */}
          {/* <fieldset className="border p-6 rounded-md"> */}
          <legend className="px-2 text-lg font-semibold text-center w-full">
            Signup
          </legend>

          {/* First Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">First Name</label>
            <input
              ref={firstNameRef}
              type="text"
              name="firstName"
              value={formData.firstName}
              className="input w-full"
              placeholder="First Name"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, lastNameRef)}
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Last Name</label>
            <input
              ref={lastNameRef}
              type="text"
              name="lastName"
              value={formData.lastName}
              className="input w-full"
              placeholder="Last Name"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-sm">Email</label>
            <input
              ref={emailRef}
              type="email"
              name="emailId"
              value={formData.emailId}
              className="input w-full"
              placeholder="Email"
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 font-medium text-sm">Password</label>
            <div className="relative">
              <input
                ref={passwordRef}
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                className="input w-full pr-10"
                placeholder="Password"
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSignup();
                  }
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                style={{ zIndex: 1 }}
              >
                {isPasswordVisible ? (
                  // 👁️ Visible
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                ) : (
                  // 🚫 Hidden
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228L3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 mt-2 text-center font-semibold">
              {error}
            </p>
          )}
          {successMsg && (
            <p className="text-green-600 mt-2 text-center font-semibold">
              {successMsg}
            </p>
          )}

          <button
            className="btn btn-neutral w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleSignup}
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-semibold"
            >
              Log in
            </Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default Signup;
