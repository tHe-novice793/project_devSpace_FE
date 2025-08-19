import React from "react";

const RequestCard = ({ user, status, onAccept, onReject }) => {
  // Disable buttons if request is not pending
  const isDisabled = status && status !== "pending";

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between shadow-sm bg-white">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              {/* Default avatar or icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0Z"
                />
              </svg>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-600">{user.about}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onAccept}
          disabled={isDisabled}
          className={`btn btn-success btn-sm ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Accept
        </button>
        <button
          onClick={onReject}
          disabled={isDisabled}
          className={`btn btn-error btn-sm ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Reject
        </button>
      </div>

      {isDisabled && (
        <div className="ml-4 text-sm italic text-gray-500 self-center">
          Request {status}
        </div>
      )}
    </div>
  );
};

export default RequestCard;
