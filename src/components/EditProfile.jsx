import { useState, useEffect } from "react";
import { Container, PostLoader, SinglePostSkeleton } from "@/components/index";
import authService from "@/appwrite/auth";
import service from "@/appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { updateProfilePrefs } from "@/store/authSlice";
import { updateProfile, addProfile } from "@/store/userProfileSlice";
import { SuccessFullSubmissionToster } from "@/components/index";

function EditProfile() {
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [bio, setBio] = useState("");
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false); // For showing image upload success message
  const [uploadedFileName, setUploadedFileName] = useState(""); // For storing selected image file name
  const [formSubmitSuccess, setFormSubmitSuccess] = useState(false); // For form submission success
  const userDetails = useSelector((state) => state.auth);
  const [formIsUpdating, setFormIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const [currUserprofile, setCurrUserProfile] = useState({});
  const userProfileData = useSelector((state) => state.userProfile);

   // Image upload handler (only for showing preview and filename)
   const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // setProfileImage(imageUrl); // For frontend preview
      setUploadedFileName(file.name); // Store image file name
      setImageUploadSuccess(true); // Show success message for image selection
    }
  };

  useEffect(() => {
    const currUserProfileDataArray = userProfileData.filter(
      (ele) => ele.userId == userDetails.userData.$id
    );
    const currUserProfileData = currUserProfileDataArray
      ? currUserProfileDataArray[0]
      : null;
    setCurrUserProfile(currUserProfileData);
    // console.log("userProfileData in useEffect1: ", currUserprofile);
  }, [currUserprofile, name,pronoun,bio,profileImage,handleImageUpload]);
  
  useEffect(() => {
    // Prepopulate fields with existing user data
    // console.log("userProfileData in useEffect2: ", currUserprofile);
    setProfileImage(currUserprofile?.featuredImage || "66e7c497002e325e378a");
    setName(currUserprofile?.userName || "");
    setPronoun(currUserprofile?.pronoun || "");
    setBio(currUserprofile?.bio || "");
  }, [userDetails, currUserprofile]);

 

  // 1. if not already present then add the values, 1st in the table db and then in userProfileSlice
  // 2. if already present then update the values, 1st in db table and then in userProfileSlice
 // 1. Ensure uploadImageToBucket returns a Promise with the image ID
const uploadImageToBucket = async () => {
  try {
    // console.log("1: uploading image");
    
    // Check if a new image has been selected
    if (uploadedFileName) {
      const fileInput = document.querySelector('input[type="file"]').files[0]; // Get the file object
      if (fileInput) {
        // Upload the image file using the uploadFile function from service
        const uploadResponse = await service.uploadFile(fileInput); // Await the upload
        if (uploadResponse?.$id) {
          // console.log("Uploaded response is: ", uploadResponse.$id);
          setProfileImage(uploadResponse.$id); // Update state with the new image ID
          return uploadResponse.$id; // Return the uploaded image ID
        } else {
          throw new Error("Image upload failed.");
        }
      }
    } else {
      // No new image uploaded, use the existing image ID
      return profileImage; 
    }
  } catch (error) {
    console.error("Error uploading the profile image", error);
    return null;
  }
};

// 2. Modify handleSubmit to wait for image upload before DB update
const handleSubmit = async () => {
  setFormIsUpdating(true);

  try {
    // Wait for the image to be uploaded and get the image ID
    const uploadedImageId = await uploadImageToBucket(); 

    // Proceed only if we have a valid image ID
    if (uploadedImageId) {
      // console.log("2: updating in DB");

      if (currUserprofile) {
        // update in DB and in slice
        const updatedProfile = {
          ...currUserprofile,
          featuredImage: uploadedImageId, // Use the uploaded image ID
          bio: bio,
          pronoun: pronoun,
          userName: name,
        };

        // Update in DB
        const res = await service.updateUserProfile(currUserprofile.$id, updatedProfile);
        // console.log("res is ", res);

        // Dispatch the updated profile to Redux
        dispatch(updateProfile(res));
      } else {
        // Add a new profile in DB and in the slice
        const newProfile = {
          userId: userDetails?.userData?.$id,
          featuredImage: uploadedImageId, // Use the uploaded image ID
          bio: bio,
          pronoun: pronoun,
          userName: name,
          status: "active",
        };

        const res = await service.addUserProfile({...newProfile});
        // console.log("responseid: ",res);
        
        const updatedVal = res;

        // Dispatch the new profile to Redux
        dispatch(addProfile(updatedVal));
      }

      // Indicate form submission success
      setFormSubmitSuccess(true);
    } else {
      throw new Error("Image upload failed.");
    }

  } catch (error) {
    console.error("DB or userSlice Add/Update profile failed:", error);
  } finally {
    setFormIsUpdating(false);
  }
};


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Edit Profile
      </h2>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={service.getFilePreview(profileImage || "66e7c497002e325e378a")}
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
        {imageUploadSuccess && (
          <p className="text-green-500 text-sm mt-2">
            Image "{uploadedFileName}" uploaded successfully!
          </p>
        )}
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
        <label className="block text-gray-700 font-semibold mb-2">
          Pronoun
        </label>
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
        <label className="block text-gray-700 font-semibold mb-2">
          Short Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={160}
          placeholder="Tell us a little about yourself"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none h-28"
        />
        <p className="text-sm text-gray-500 mt-1">{bio.length}/160</p>
      </div>
      {formSubmitSuccess && (
        <SuccessFullSubmissionToster />
        // <p className="text-green-500 text-center mt-4">Profile updated successfully!</p>
      )}
      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className={`text-white px-6 py-2 rounded-full font-semibold  transition-colors  ${
            formIsUpdating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
