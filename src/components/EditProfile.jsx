import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
// import { addUser } from "../redux/userSlice"; // Assuming you have this action

const genderOptions = ["male", "female", "others"];

const EditProfile = ({ user }) => {
  const initialUser = user?.data || {};

  const [firstName, setFirstName] = useState(initialUser.firstName || "");
  const [lastName, setLastName] = useState(initialUser.lastName || "");
  const [age, setAge] = useState(initialUser.age || "");
  const [about, setAbout] = useState(initialUser.about || "");
  const [skills, setSkills] = useState(initialUser.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [gender, setGender] = useState(initialUser.gender || "");
  const [photoUrl, setPhotoUrl] = useState(initialUser.photoUrl || "");
  const [photoPreview, setPhotoPreview] = useState(initialUser.photoUrl || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const userCardRef = useRef(null);
  const debounceTimer = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!skillInput.trim()) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      handleAddSkillFromInput();
    }, 1200);
    return () => clearTimeout(debounceTimer.current);
  }, [skillInput]);

  const handleAddSkillFromInput = () => {
    if (!skillInput.trim()) return;
    const newSkills = skillInput
      .split(/[\s,]+/)
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0 && !skills.includes(s) && skills.length < 10);
    setSkills([...skills, ...newSkills]);
    setSkillInput("");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      setPhotoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...skills];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setSkills(reordered);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !gender || !age) {
      setError("Please fill all required fields.");
      return;
    }

    if (age < 18) {
      setError("Age must be 18 or above.");
      return;
    }

    const profileData = {
      firstName,
      lastName,
      age: Number(age),
      about,
      skills,
      gender: gender.toLowerCase(),
      photoUrl,
    };

    try {
      const res = await axios.patch(`${BASE_URL}/profile/edit`, profileData, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setError("");
      setSuccess("Profile Saved Successfully.");

      // Smooth scroll to preview
      if (userCardRef.current) {
        userCardRef.current.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  };

  const handleCancel = () => {
    setFirstName(initialUser.firstName || "");
    setLastName(initialUser.lastName || "");
    setAge(initialUser.age || "");
    setAbout(initialUser.about || "");
    setSkills(initialUser.skills || []);
    setSkillInput("");
    setGender(initialUser.gender || "");
    setPhotoUrl(initialUser.photoUrl || "");
    setPhotoPreview(initialUser.photoUrl || "");
    setError("");
    setSuccess(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-10 px-4 gap-8">
      {/* Form Section */}
      <div className="w-full md:w-2/3">
        <div className="bg-base-200 rounded-lg shadow-md p-6 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Edit Profile
          </h2>

          {/* Mobile Preview Toggle */}
          <div className="mb-4 md:hidden text-center">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>

          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-6">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-2 border"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2 flex items-center justify-center">
                <span className="text-sm text-gray-600">No Image</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="file-input file-input-sm file-input-bordered w-full max-w-xs"
            />
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              value={firstName}
              className="input input-bordered w-full"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              className="input input-bordered w-full"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="number"
              value={age}
              className="input input-bordered w-full"
              placeholder="Your Age"
              onChange={(e) => setAge(e.target.value)}
              min={18}
            />
            <textarea
              value={about}
              className="textarea textarea-bordered w-full"
              placeholder="Tell us something about yourself"
              onChange={(e) => setAbout(e.target.value)}
            />
            <select
              value={gender}
              className="select select-bordered w-full"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              {genderOptions.map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>

            {/* Skills */}
            <div>
              <label className="label">Skills</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  className="input input-bordered flex-grow"
                  placeholder="Add skills (e.g. HTML, CSS)"
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (["Enter", "Tab", ","].includes(e.key)) {
                      e.preventDefault();
                      handleAddSkillFromInput();
                    }
                  }}
                />
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={handleAddSkillFromInput}
                >
                  Add
                </button>
              </div>

              {skills.length > 0 && (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="skills" direction="horizontal">
                    {(provided) => (
                      <div
                        className="flex flex-wrap gap-2 mt-3"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {skills.map((skill, index) => (
                          <Draggable
                            key={skill}
                            draggableId={skill}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="badge badge-info text-white px-3 py-2 text-sm flex items-center"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {skill.toUpperCase()}
                                <button
                                  className="ml-2 text-white hover:text-red-200"
                                  onClick={() =>
                                    setSkills(skills.filter((s) => s !== skill))
                                  }
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </div>
          </div>

          {/* Error / Success */}
          {error && (
            <p className="text-red-500 mt-4 break-words">ERROR: {error}</p>
          )}
          {success && (
            <div className="toast toast-top toast-center z-50">
              <div className="alert alert-success">
                <span>{success}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
            <button
              className="btn btn-outline btn-error w-full sm:w-auto"
              onClick={handleCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div
          ref={userCardRef}
          className="w-full md:w-1/3 bg-base-100 rounded-lg shadow p-4 overflow-hidden"
          //   style={{ minWidth: 0 }}
        >
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              gender,
              about,
              skills,
              photoUrl,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EditProfile;
