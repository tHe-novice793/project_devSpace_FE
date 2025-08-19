import React, { useEffect } from "react";
import { FaInbox } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests } from "../utils/requestSlice";
import RequestCard from "../components/RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };

  const handleReview = async (id, action) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${action}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      fetchRequests(); // Refresh after action
    } catch (err) {
      console.error(`Failed to ${action} request:`, err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Connection Requests</h2>
      {Array.isArray(requests) && requests.length > 0 ? (
        <div className="grid gap-4">
          {requests.map((req) => (
            <RequestCard
              key={req._id}
              user={req.fromUserId}
              onAccept={() => handleReview(req._id, "accepted")}
              onReject={() => handleReview(req._id, "rejected")}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
          <FaInbox size={48} className="mb-4 opacity-40" />
          <p className="mb-2 text-lg">No new connection requests.</p>
          <p className="max-w-sm text-sm">
            You don’t have any pending connection requests right now. Check back
            later or{" "}
            <span className="font-semibold">
              Explore profiles to connect with others.
            </span>{" "}
            {/* page. */}
          </p>
        </div>
      )}
    </div>
  );
};

export default Requests;
