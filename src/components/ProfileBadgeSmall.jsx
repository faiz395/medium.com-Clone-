import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFollow, removeFollow } from "@/store/followSlice.js";
import { getFollowerByuserIdAndFollowerId } from "@/lib/helperFunctions";
import service from "@/appwrite/config";

function ProfileBadgeSmall({ postAuthorId, followerId }) {
  const followData = useSelector((state) => state.follow);
  const userDetails = useSelector((state) => state.auth);
  const userProfileDetails = useSelector((state) => state.userProfile);

  const [isFollowing, setIsFollowing] = useState(false);
  const [author, setAuthor] = useState({});
  const dispatch = useDispatch();

  // 1. Check if `postAuthorId` and `followerId` are available before proceeding.
  useEffect(() => {
    if (!postAuthorId || !followerId) return;

    console.log("postAuthorId:", postAuthorId);
    console.log("followerId:", followerId);

    // 2. Fetch the author details when `postAuthorId` is available
    const authorDetails = userProfileDetails.find(data => data.userId === postAuthorId);
    if (authorDetails) {
      setAuthor(authorDetails);
    }

  }, [postAuthorId, followerId, userProfileDetails]);

  // 3. Check follow status only when `postAuthorId` and `followerId` are available
  useEffect(() => {
    if (!postAuthorId || !followerId) return;

    const followersAvailable = getFollowerByuserIdAndFollowerId(
      postAuthorId,
      followerId,
      followData
    );

    if (followersAvailable.length > 0) {
      const isUserFollowing = followersAvailable.some(data =>
        data.userId_follower === userDetails.userData.$id && data.userId_following === postAuthorId
      );
      setIsFollowing(isUserFollowing);
    } else {
      setIsFollowing(false);
    }

  }, [followData, postAuthorId, followerId, userDetails.userData.$id]);

  // If either `postAuthorId` or `followerId` is missing, don't render the badge.
  if (!postAuthorId || !followerId) return null;

  const handleFollowClick = async () => {
    const followersAvailable = await getFollowerByuserIdAndFollowerId(
      postAuthorId,
      followerId,
      followData
    );

    if (followersAvailable.length > 0) {
      // Remove follower if already following
      followersAvailable.forEach(async (element) => {
        await service.removeFollower(element.$id);
        dispatch(removeFollow(element.$id));
      });
    } else {
      // Add follower if not following
      const addingFollower = await service.addFollower(postAuthorId, followerId);
      dispatch(addFollow(addingFollower));
    }

    // Toggle follow status
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
          {postAuthorId !== followerId && (
            <button
              className="ml-2 text-gray-700 py-1 px-3 rounded-full text-sm hover:bg-gray-300 transition-colors"
              onClick={handleFollowClick}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <p className="text-sm text-left text-gray-600">
          {(author?.bio?.length > 50
            ? author.bio.substring(0, 50) + "..."
            : author?.bio) || "sampleBio, edit your profile from the edit section in the menu"}
        </p>
      </div>
    </div>
  );
}

export default ProfileBadgeSmall;
