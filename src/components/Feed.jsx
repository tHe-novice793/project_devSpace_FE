import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      if (res.data && res.data.users) {
        setUsers(res.data.users);
        setCurrentIndex(0);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError("Failed to load users.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p>{error}</p>
        <button onClick={fetchUsers} className="btn btn-primary mt-4">
          Retry
        </button>
      </div>
    );
  }

  if (!users.length || currentIndex >= users.length) {
    return (
      <div className="text-center mt-20 text-gray-600">
        <p>No more users available.</p>
        <button onClick={fetchUsers} className="btn btn-primary mt-4">
          Reload Feed
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10 px-4">
      <UserCard user={users[currentIndex]} onNext={handleNext} />
    </div>
  );
};

export default Feed;
