import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  // Track loading state while fetching user profile
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // If user data already exists, skip fetching
      if (userData?.data?.id) {
        setLoading(false);
        return;
      }

      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        // Unauthorized: redirect to login
        navigate("/login");
      } else {
        // Log unexpected errors only
        console.error(err.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    // Show a loading indicator while fetching
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* NavBar */}
      <NavBar />

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Body;
