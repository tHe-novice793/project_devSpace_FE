import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, onNext }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user || {};
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();
  const placeholderImg = "https://via.placeholder.com/300x200?text=No+Image";
  const dispatch = useDispatch();

  const handleSendRequest = async (id, action) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${action}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
      if (onNext) onNext(); // move to next user after response
    } catch (err) {
      console.error(`Failed to ${action} request:`, err);
    }
  };

  return (
    <div className="bg-white w-full max-w-sm sm:max-w-md rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden relative">
      <figure className="relative">
        <img
          src={photoUrl || placeholderImg}
          alt={`${fullName} Avatar`}
          className="w-full h-60 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-3 py-1 text-xs rounded-full shadow">
          {gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : ""}
        </div>
      </figure>

      <div className="p-5 space-y-3">
        <h2 className="text-2xl font-bold text-primary">{fullName}</h2>
        {age && <p className="text-sm text-gray-500">{age} yrs old</p>}
        <p className="text-sm text-gray-700 line-clamp-4">{about}</p>

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full"
              >
                {skill.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={() => handleSendRequest(_id, "interested")}
            className="btn btn-primary w-full sm:w-1/2"
          >
            👍 Interested
          </button>
          <button
            onClick={() => handleSendRequest(_id, "ignored")}
            className="btn btn-outline btn-error w-full sm:w-1/2"
          >
            ❌ Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
