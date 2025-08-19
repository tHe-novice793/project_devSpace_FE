import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Fetch paginated connections
  const fetchConnections = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/connection?page=${page}&limit=10`,
        {
          withCredentials: true,
        }
      );

      const newConnections = res?.data?.data || [];
      if (newConnections.length === 0) setHasMore(false);
      else dispatch(addConnections(newConnections));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections(page);
  }, [page]);

  // Infinite scroll observer
  const lastConnectionRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  if (!connections || connections.length === 0) {
    return <h1 className="text-center bg-base-100 mt-10 text-lg">No Connections Found.</h1>;
  }

  const handleRemove = (id) => {
    // Dummy remove: You’d typically make a DELETE request here
    console.log("Remove connection", id);
    // Optionally dispatch a Redux action to remove from store
  };

  const handleMessage = (id) => {
    console.log("Message user", id);
    // Navigate to chat or open modal, etc.
  };

  return (
    <div className="my-10 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Connections</h1>

      <div className="grid gap-6 grid-cols-1  sm:grid-cols-2 lg:grid-cols-1">
        {connections.map((connection, idx) => (
          <div
            key={connection._id}
            ref={idx === connections.length - 1 ? lastConnectionRef : null}
            className="p-6 border border-gray-200 rounded-lg shadow-md bg-white flex flex-col sm:flex-row items-center gap-4 animate-fade-in"
          >
            <img
              alt="Profile"
              src={connection.photoUrl}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg font-semibold text-gray-800">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-sm text-gray-500">
                {connection.age} years old • {connection.gender}
              </p>
              <p className="text-sm text-gray-600 mt-1">{connection.about}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={() => handleMessage(connection._id)}
              >
                Message
              </button>
              <button
                className="btn btn-sm btn-outline btn-error"
                onClick={() => handleRemove(connection._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
