// components/layouts/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center">
      <div className="w-full max-w-xl px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default PublicLayout;
