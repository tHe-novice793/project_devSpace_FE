import React from "react";

const RequestCard = ({ user, onAccept, onReject }) => {
  if (!user) return null;

  return (
    <div className="card bg-base-200 shadow-md p-4 flex flex-col md:flex-row items-center gap-4">
      <img
        src={user.photoUrl}
        alt={`${user.firstName}'s avatar`}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
        <p className="text-sm text-gray-500">{user.about}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {user.skills.map((skill, idx) => (
            <span key={idx} className="badge badge-secondary">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button onClick={onAccept} className="btn btn-sm btn-success">
          Accept
        </button>
        <button onClick={onReject} className="btn btn-sm btn-error">
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
