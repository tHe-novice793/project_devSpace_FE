import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
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
        navigate("/login");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
