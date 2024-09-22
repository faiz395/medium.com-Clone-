import { useState, useEffect } from "react";
import { Container, PostLoader, SinglePostSkeleton } from "@/components/index";
import authService from "@/appwrite/auth";
import service from "@/appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { updateProfilePrefs } from "@/store/authSlice";
import { updateProfile, addProfile } from "@/store/userProfileSlice";


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

  useEffect(() => {
    const currUserProfileDataArray = userProfileData.filter(
      (ele) => ele.userId == userDetails.userData.$id
    );
    const currUserProfileData = currUserProfileDataArray
      ? currUserProfileDataArray[0]
      : null;
    setCurrUserProfile(currUserProfileData);
    console.log("userProfileData in useEffect1: ", currUserprofile);
  }, [currUserprofile]);

  useEffect(() => {
    // Prepopulate fields with existing user data
    console.log("userProfileData in useEffect2: ", currUserprofile);
    setProfileImage(currUserprofile?.featuredImage || "66e7c497002e325e378a");
    setName(currUserprofile?.userName || "sampleName");
    setPronoun(currUserprofile?.pronoun || "");
    setBio(currUserprofile?.bio || "");
  }, [userDetails, currUserprofile]);

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

  // 1. if not already present then add the values, 1st in the table db and then in userProfileSlice
  // 2. if already present then update the values, 1st in db table and then in userProfileSlice
  const uploadImageToBucket= async ()=>{
    try {
      // let uploadedImageId = profileImage; // Use existing image if no new image is uploaded
      console.log("1: uploadingimage");
      
      // Check if a new image has been selected
      if (uploadedFileName) {
        const fileInput = document.querySelector('input[type="file"]').files[0]; // Get the file object
        if (fileInput) {
          // Upload the image file using the uploadFile function from service
          service.uploadFile(fileInput).then((uploadResponse) => {
            console.log("uploadedresponseis: ", uploadResponse.$id);

            if (uploadResponse?.$id) {
              // uploadedImageId = uploadResponse.$id;
              setProfileImage(uploadResponse.$id); // Store uploaded image ID
              console.log("profilnameissettonewIdwhereidis:",uploadResponse.$id);
              return uploadResponse.$id;
              
              // dispatch(
              //   updateProfilePrefs({
              //     name,
              //     pronoun,
              //     bio,
              //     profileImage: uploadedImageId, // Use the uploaded image ID
              //   })
              // );
            } else {
              throw new Error("Image upload failed.");
            }
          });
        }
      }

      // Call authService to update profile preferences
      // const response = await authService.updateProfilePrefs({
      //   name,
      //   pronoun,
      //   bio,
      //   profileImage: profileImage, // Use the uploaded image ID
      // });

      // if (response) {
      //   setFormSubmitSuccess(true); // Set form submission success
      // } else {
      //   console.error("Error updating profile");
      // }
    } catch (error) {
      console.error("Error uploading the profileimage", error);
      return false;
    }
    return true;
  }
  // Form submission handler
  const handleSubmit = async () => {
    setFormIsUpdating(true);
   
    uploadImageToBucket()
    .then(imageId=>{
      try {
        console.log("2: updatingindb");
  
        if (currUserprofile) {
          // update in DB and in slice
          service
            .updateUserProfile(currUserprofile.$id, {
              ...currUserprofile,
              featuredImage: imageId.$id || profileImage,
              bio: bio,
              pronoun: pronoun,
              userName: name,
            })
            .then((res) => {
              console.log("res is ", res);
              console.log("sendingdispatchtoupdatefile");
              
              dispatch(updateProfile(res));
            });
        } else {
          // add in DB and in slice
          service
            .addUserProfile({
              userId: userDetails?.userData?.$id,
              featuredImage: profileImage,
              bio: bio,
              pronoun: pronoun,
              userName: name,
              status: "active",
            })
            .then((res) => {
              const updatedVal = res.documents[0];
              dispatch(addProfile(updatedVal));
            });
        }
      } catch (error) {
        throw new Error("DBoruserSlice Add/Update profile failed:", error);
      }
    })
    

    setFormIsUpdating(false);
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
        // <SuccessFullSubmissionToster />
        <p className="text-green-500 text-center mt-4">Profile updated successfully!</p>
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