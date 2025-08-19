import React from "react";
import { Outlet, Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <Outlet />
        <p className="mt-6 text-center text-gray-600">
          Go back to{" "}
          <Link to="/" className="text-purple-700 hover:underline font-semibold">
            Landing Page
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
