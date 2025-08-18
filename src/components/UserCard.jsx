const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about, skills } =
    user || {};

  return (
    <div className="card bg-base-300 w-full max-w-sm shadow-sm">
      <figure>
        <img
          src={photoUrl || "https://via.placeholder.com/150?text=No+Image"}
          alt={`${firstName} ${lastName} Avatar`}
          className="object-cover w-full h-48"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title break-words">{`${firstName || ""} ${
          lastName || ""
        }`}</h2>
        <h4>
          {age ? age + ", " : ""}
          {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : ""}
        </h4>
        <p className="break-words">{about}</p>

        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="badge badge-info text-white px-3 py-1 text-xs"
              >
                {skill.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        {/* Buttons Section */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button className="btn btn-primary flex-1 w-full sm:w-auto">
            Interested
          </button>
          <button className="btn btn-error flex-1 w-full sm:w-auto">
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
