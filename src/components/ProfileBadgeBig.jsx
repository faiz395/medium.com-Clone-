import React from "react";
import { useState } from "react";
import { addFollow, removeFollow, clearFollow } from "@/store/followSlice.js";
import { getFollowerByuserIdAndFollowerId,getFollowersByuserId } from "@/lib/helperFunctions";
import { useSelector, useDispatch } from "react-redux";
import service from "@/appwrite/config";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const author = {
  name: "John Doe",
  imageUrl: "https://avatar.iran.liara.run/public/girl",
  bio: "A passionate writer who loves sharing knowledge and insights on various topics. Coffee enthusiast.",
  followerCount: 250,
  isFollowing: false,
};
function ProfileBadgeBig({ postAuthorId, followerId }) {
  // function ProfileBadgeBig({ author }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const followData = useSelector((state) => state.follow);
  const userDetails = useSelector((state) => state.auth);

  const userProfileDetails = useSelector(state=>state.userProfile)
  const [author,setAuthor]=useState({});

  const dispatch = useDispatch();
  
  useEffect(()=>{
    const val = userProfileDetails.filter(data=>data.userId==postAuthorId)
    console.log('userPrfolifromloggedinnavisfrombigbadge: ',val);
    setAuthor(val[0]);
  },[author,userProfileDetails])

  useEffect(() => {
    const followersAvailable = getFollowerByuserIdAndFollowerId(
      postAuthorId,
      followerId,
      followData
    );
    const allFollowersAvailableForThisAuthor = getFollowersByuserId(postAuthorId,followData)
    console.log("followersavailableare:",followersAvailable);
    

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
    setFollowCount(allFollowersAvailableForThisAuthor?.length || 0);
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
    <div className="block md:flex md:justify-between items-center space-x-4 p-6 bg-white rounded-lg shadow-lg w-full">
      <div className="flex flex-col items-center md:items-start">
        <img
          src={service.getFilePreview(author?.featuredImage || '66e7c497002e325e378a')}
          alt="Author Image"
          className="w-20 h-20 rounded-full mb-4"
        />
        <h4 className="text-2xl font-bold text-gray-900">
          Written by {author?.userName || "sampleName"}
        </h4>
        <p className="text-sm text-gray-500 mt-2">Followers: {followCount}</p>
        <p className="text-sm text-gray-700 mt-4 text-left">
        {(author?.bio) ||'sampleBio, edit your profile from the edit section in menu'}
        </p>
      </div>
      <div className="flex flex-col items-end justify-center md:ml-auto">
        {postAuthorId != followerId && (
          <button
            className={`py-2 px-6 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors max-sm:my-4`}
            onClick={handleFollowClick}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
        {postAuthorId === followerId && (
          <Link to={"/edit-profile"}>
            <button
              className={`py-2 px-6 rounded-full bg-gray-200 w-full text-gray-700 font-semibold hover:bg-gray-300 transition-colors max-sm:my-4`}
            >
              Edit Profile
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProfileBadgeBig;
