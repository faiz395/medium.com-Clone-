import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function EditProfile() {
  const [profileImage, setProfileImage] = useState(
    "https://miro.medium.com/v2/resize:fill:100:100/1*dmbNkD5D-u45r44go_cf0g.png"
  );
  const [name, setName] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [bio, setBio] = useState("");
  const userDetails = useSelector(state=>state.auth);
  console.log("Printinguserdatafromeditprofile: ",userDetails);

  // Image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleSubmit = ()=>{

  }


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Edit Profile
      </h2>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"
        />
        <label className="cursor-pointer bg-gray-200 py-2 px-4 rounded-full text-sm text-gray-700 hover:bg-gray-300 transition-colors">
          Upload Image
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-sm text-gray-500 mt-1">{name.length}/50</p>
      </div>

      {/* Pronoun Field */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Pronoun</label>
        <input
          type="text"
          value={pronoun}
          onChange={(e) => setPronoun(e.target.value)}
          maxLength={4}
          placeholder="Pronoun"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p className="text-sm text-gray-500 mt-1">{pronoun.length}/4</p>
      </div>

      {/* Short Bio Field */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Short Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={160}
          placeholder="Tell us a little about yourself"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-28"
        />
        <p className="text-sm text-gray-500 mt-1">{bio.length}/160</p>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button onClick={handleSubmit} className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
