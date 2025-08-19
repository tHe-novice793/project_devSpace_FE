import React from "react";

const RequestCard = ({ user, status, onAccept, onReject }) => {
  const isDisabled = status !== "interested";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border rounded-lg p-4 shadow-md bg-white transition hover:shadow-lg">
      {/* Avatar & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {user?.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
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
          <p className="text-sm text-gray-600 line-clamp-2">{user.about || "No bio provided."}</p>
        </div>
      </div>

      {/* Actions & Status */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
        <button
          onClick={onAccept}
          disabled={isDisabled}
          className={`btn btn-success btn-sm w-full sm:w-auto ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ✅ Accept
        </button>
        <button
          onClick={onReject}
          disabled={isDisabled}
          className={`btn btn-error btn-sm w-full sm:w-auto ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ❌ Reject
        </button>
        {isDisabled && (
          <div className="text-xs text-gray-500 italic">
            Already {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
