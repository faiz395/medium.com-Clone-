import React from "react";
import { useState } from "react";
import { addFollow, removeFollow, clearFollow } from "@/store/followSlice.js";
import { getFollowerByuserIdAndFollowerId } from "@/lib/helperFunctions";
import { useSelector, useDispatch } from "react-redux";
import service from "@/appwrite/config";
import { useEffect } from "react";
import userProfileSlice from "@/store/userProfileSlice.js";


// set proper name and imageUrl for profile table as well with a bio

const author = {
  name: "John Doe",
  imageUrl: "https://avatar.iran.liara.run/public/girl",
  bio: "A passionate writer who loves sharing knowledge and insights on various topics. Coffee enthusiast.",
  followerCount: 250,
  isFollowing: false,
};

function ProfileBadgeSmall({ postAuthorId, followerId }) {
  // function ProfileBadgeSmall({ author }) {
  const followData = useSelector((state) => state.follow);
  const userDetails = useSelector((state) => state.auth);
  // const [author, setAuthor] = useState({});
  const [isFollowing, setIsFollowing] = useState();
  const userProfileDetails = useSelector(state=>state.userProfile)
  const [author,setAuthor]=useState({});


  // useEffect(()=>{
  //   const authorDetails = {
  //     name:userDetails?.userData?.name,
  //     imageUrl:userDetails?.userData?.prefs?.profileImage || "66e7c497002e325e378a",
  //     bio: userDetails?.userData?.prefs?.bio ||
  //       "Sample Bio: Please Write Your Bio From Edit Profile",
  //     followerCount: 250,
  //     isFollowing: false,
  //   }
  //   setAuthor(authorDetails)
  // },[])

  const dispatch = useDispatch();

  useEffect(()=>{
    const val = userProfileDetails.filter(data=>data.userId==postAuthorId)
    console.log('userPrfolifromloggedinnavis: ',val);
    
    setAuthor(val[0]);
  },[author,userProfileDetails])
  
  useEffect(() => {
    const followersAvailable = getFollowerByuserIdAndFollowerId(
      postAuthorId,
      followerId,
      followData
    );

    if (followersAvailable.length > 0) {
      // remove it from appwrite and from followSlice
      const val = followersAvailable.filter(data=>data.userId_follower==userDetails.userData.$id && data.userId_following==postAuthorId)
      if(val?.length>0){
        setIsFollowing(true);
      }
      else{
        setIsFollowing(false);
      }
    } else {
      setIsFollowing(false);
    }
  }, [followData]);

  const handleFollowClick = async () => {
    console.log("pritingauthorId", postAuthorId);
    console.log("pritingfollowerId", followerId);
    console.log("pritingfollowDatafromprofilebadgesmall", followData);

    const followersAvailable = await getFollowerByuserIdAndFollowerId(
      postAuthorId,
      followerId,
      followData
    );
    console.log("followersAvaiabledata", followersAvailable);

    if (followersAvailable.length > 0) {
      // remove it from appwrite and from followSlice
      console.log("removing follower");
      followersAvailable.forEach(async (element) => {
        const removeIt = await service.removeFollower(element.$id);
        dispatch(removeFollow(element.$id));
      });
    } else {
      // add followerin appwrite and in followSlice
      console.log("adding follower");

      const addingFollower = await service.addFollower(
        postAuthorId,
        followerId
      );
      dispatch(addFollow(addingFollower));
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="flex justify items-start space-x-4 p-4 bg-white rounded-lg w-full">
      <img
        src={service.getFilePreview(author?.featuredImage || '66e7c497002e325e378a')}
        alt="Author Image"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col">
        <div className="flex items-center justify w-full">
          <h4 className="font-semibold text-gray-900">{author?.userName || "sampleName"}</h4>
          {postAuthorId != followerId && (
            <button
              className={`ml-2 text-gray-700  py-1 px-3 rounded-full text-sm hover:bg-gray-300 transition-colors`}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <p className="text-sm text-left text-gray-600">
          {(author?.bio?.length > 50
            ? author?.bio?.substring(0, 50) + "..."
            : author?.bio)||'sampleBio, edit your profile from the edit section in menu'}
        </p>
      </div>
    </div>
  );
}

export default ProfileBadgeSmall;
