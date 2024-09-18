import { useState, useEffect } from "react";
import { Container, PostLoader, SinglePostSkeleton } from "@/components/index";
import authService from "@/appwrite/auth";
import service from "@/appwrite/config";
import { useSelector, useDispatch } from "react-redux";

function SuccessFullSubmissionToster() {
  return (
    <>
      <div
        class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
        role="alert"
      >
        <svg
          class="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Congrats!</span> Profile Updated Successfully!
        </div>
      </div>
{/* 
      <div
        class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert"
      >
        <svg
          class="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Danger alert!</span> Change a few things up
          and try submitting again.
        </div>
      </div>
      <div
        class="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
        role="alert"
      >
        <svg
          class="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Info alert!</span> Change a few things up
          and try submitting again.
        </div>
      </div>
      <div
        class="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
        role="alert"
      >
        <svg
          class="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Warning alert!</span> Change a few things up
          and try submitting again.
        </div>
      </div>
      <div
        class="flex items-center p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
        role="alert"
      >
        <svg
          class="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Dark alert!</span> Change a few things up
          and try submitting again.
        </div>
      </div> */}
    </>
  );
}

function EditProfile() {
  const [profileImage, setProfileImage] = useState(
    "https://miro.medium.com/v2/resize:fill:100:100/1*dmbNkD5D-u45r44go_cf0g.png"
  );

  const userDetails = useSelector((state) => state.auth);

  // name
  // imageid
  // pronoun
  // shortbio

  const [name, setName] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [bio, setBio] = useState("");
  const [imageId, setImageId] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [profileIsUpdating, setProfileIsUpdating] = useState(false);
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);
  console.log("Printinguserdatafromeditprofile: ", userDetails);

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileToUpload(file);
      console.log("upoadedimage: ", file);
      console.log("typeof: ", typeof file);
      console.log("typeoffileToUpload", typeof fileToUpload);
    }
  };

  const handleSubmit = async () => {
    // 1. upload file and get the ID - do tomorrow
    setProfileIsUpdating(true);
    if (fileToUpload) {
      const responseVal = await service.uploadFile(fileToUpload);
      setImageId(responseVal?.$id);
    }
    // console.log("reponsefromuploadedfile: ", responseVal);
    const userId = userDetails.userData.$id;
    // console.log("pritinguserid", userId);
    // console.log("pritingname", name);
    const response = await authService.updateUserName(name);
    // console.log("responsefrom form after name submission is ", response);
    const prefs = {
      profileImage: imageId,
      pronoun: pronoun,
      bio: bio,
    };
    const res = await authService.updateProfilePrefs(prefs);
    // console.log("responsefromprefsis: ", res);
    if (res) {
      setSubmissionSuccessful(true);
    }
    setProfileIsUpdating(false);
  };

  useEffect(() => {
    // load all the values and store in the fields

    setName(userDetails?.userData?.name);
    setBio(
      userDetails?.userData?.prefs?.bio ||
        "Sample Bio: Please Write Your Bio From Edit Profile"
    );
    setPronoun(userDetails?.userData?.prefs?.pronoun || "Him");
    setImageId(
      userDetails?.userData?.prefs?.profileImage || "66e7c497002e325e378a"
    );
  }, []);

  // return  <SinglePostSkeleton/>;

  // return  (<Container>
  //   <SinglePostSkeleton/>
  // </Container>)

  // show submit message when the submission is done successfully

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Edit Profile
      </h2>

      {/* Profile Image Section */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={service.getFilePreview(imageId) || profileImage}
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

      {/* Save Button */}
      {submissionSuccessful && <SuccessFullSubmissionToster />}
      <div className="flex justify-center">
        <button
          className={` text-white px-6 py-2 rounded-full font-semibold transition-colors ${
            profileIsUpdating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
