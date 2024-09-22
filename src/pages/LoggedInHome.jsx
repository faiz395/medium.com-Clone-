import React, { useState, useEffect } from "react";
import {
  PostCard,
  PostCard2,
  Container,
  PostLoaderSingleSkeleton,
} from "@/components/index.js";
import appwriteService from "@/appwrite/config";
import { LoggedOutHome } from "./index.js";
import authService from "@/appwrite/auth.js";
import postSlice from "../store/postSlice.js";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getLikes, getComments, formatDate } from "@/lib/helperFunctions.js";
import { PostLoader } from "@/components/index.js";

function LoggedInHome() {
  // const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState("");
  const [postsToLoad, setPostsToLoad] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(true);
  const postsData = useSelector((state) => state.post);

  const comments = useSelector((state) => state.comment);
  const navigate = useNavigate();
  // console.log("post from store");
  const [posts, setPosts] = useState([]);
  const likes = useSelector((state) => state.like);
  const userData = useSelector((state) => state.auth);
  const followData = useSelector((state) => state.follow);
  console.log("Priting like from logged in home");
  console.log(likes);
  const [selectedFilter, setSelectedFilter] = useState("All Posts");

  // console.log(postFromStore);
  const getAllTheInfluencersBasedOnFollowerdId = (userId) => {
    // get all the people this userid is following to
    console.log("getAllTheInfluencersBasedOnFollowerdId", userId);
    const allTheInfluencers = followData
      .filter((ele) => ele.userId_follower === userId)
      .map((val) => val.userId_following);
    console.log("allTheInfluencersfromfunc", allTheInfluencers);

    // find all the posts from these followers
    const postsToDisplay = postsData.filter((postVal) =>
      allTheInfluencers.includes(postVal.postData.userId)
    );
    console.log("poststodisplayfromfunc", postsToDisplay);
    return postsToDisplay;
  };

  const loadPosts = (filter) => {
    setSelectedFilter(filter);
    // Call API or load posts based on filter (e.g., All Posts or Following)
    if (filter === "All Posts") {
      console.log("Load All Posts");
      setPosts(postsData);
      // Load all posts logic here
    } else if (filter === "Following") {
      console.log("Load Following Posts");
      const values = getAllTheInfluencersBasedOnFollowerdId(currUserId);
      setPosts(values);
      // Load posts from following logic here
      // get all the people this user is following to, and load all the posts from then as postdata.userId
    }
  };

  useEffect(() => {
    // Assuming you have a function to get the current user
    authService.getCurrentUser().then((userData) => {
      setCurrUserId(userData.$id);
    });
  }, []);

  useEffect(() => {
    if (currUserId) {
      setPosts(postsData);
      loadPosts(selectedFilter); // Trigger loadPosts once currUserId is set
      setIsLoaderActive(false);
      setPostsToLoad(
        postsData.filter((post) => post?.postData?.userId === currUserId)
      );
    }
  }, [currUserId, postsData, selectedFilter, postsToLoad]);

  if (postsData?.length == 0) {
    return <LoggedOutHome />;
  }
  return (
    <Container widthOfContainer={"max-sm:max-w-[90%] max-w-[80%]"}>
      <div className="flex flex-wrap">
        <div className="max-md:w-full lg:w-2/3 px-1 ">
          {isLoaderActive && <PostLoader isActive={isLoaderActive} />}

          {!isLoaderActive && (
            <>
              <div className="w-full bg-white p-4 flex  justify-start">
                <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                  {/* All Posts Tab */}
                  <button
                    className={`py-2 px-4  text-sm ${
                      selectedFilter === "All Posts"
                        ? "border-b-2 border-black text-black"
                        : " text-gray-600"
                    } transition-colors hover:bg-black hover:text-white`}
                    onClick={() => loadPosts("All Posts")}
                  >
                    All Posts
                  </button>

                  {/* Following Tab */}
                  <button
                    className={`py-2 px-4  text-sm ${
                      selectedFilter === "Following"
                        ? "border-b-2 border-black text-black"
                        : " text-gray-600"
                    } transition-colors hover:bg-black hover:text-white`}
                    onClick={() => loadPosts("Following")}
                  >
                    Following
                  </button>
                </div>
              </div>
              
              {posts.length > 0 ? (
                [...posts]
                  .sort(
                    (a, b) =>
                      new Date(b.postData.$createdAt) -
                      new Date(a.postData.$createdAt)
                  )
                  .map((post) => {
                    console.log("postVal in map ", post);
                    const likesVal = getLikes(likes, post?.postId);
                    console.log("likesVal priting: ", likesVal);
                    const commentVal = getComments(comments, post?.postId);
                    console.log("postvalinmap, ", post);
                    return (
                      <div key={post.postId}>
                        <PostCard
                          {...post.postData}
                          likesCount={likesVal?.length}
                          commentsCount={commentVal?.length}
                          pulishdate={formatDate(post.postData?.$createdAt)}
                        />
                      </div>
                    );
                  })
              ) : (
                <div className="text-center text-lg">
                  Follow Some People To See Their Posts
                </div>
              )}
            </>
          )}
        </div>
        <div className="max-mid:w-full lg:w-1/3 px-2  block max-md:hidden">
          {isLoaderActive && (
            <PostLoaderSingleSkeleton isActive={isLoaderActive} />
          )}

          {!isLoaderActive && (
            <>
              <h2 className="text-center font-bold text-[30px] my-4">
                Your Posts
              </h2>
              <div className="flex flex-wrap justify-center">
                {postsToLoad &&
                  postsToLoad
                    .sort(
                      (a, b) =>
                        new Date(b.postData.$createdAt) -
                        new Date(a.postData.$createdAt)
                    )
                    .map((post) => {
                      const likesVal = getLikes(likes, post.postId);
                      const commentVal = getComments(comments, post?.postId);

                      return (
                        <div key={post.postId}>
                          <PostCard2
                            {...post.postData}
                            likesCount={likesVal?.length}
                            commentsCount={commentVal?.length}
                            pulishdate={formatDate(post.postData.$createdAt)}
                            className="max-w-[350px]"
                          />
                        </div>
                      );
                    })}
                {postsToLoad.length == 0 && (
                  <div className="flex flex-col items-center justify-center bg-gray-50 p-8 rounded-lg shadow-lg w-full mx-auto my-10">
                    {/* <!-- Icon or illustration --> */}
                    <div className="mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-20 h-20 text-blue-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>

                    {/* <!-- Heading --> */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                      Create Your First Post!
                    </h2>

                    {/* <!-- Description --> */}
                    <p className="text-gray-600 text-center mb-6 max-w-lg">
                      It looks like you haven’t published any posts yet. Start
                      sharing your thoughts and ideas with the world by creating
                      your first post now.
                    </p>

                    {/* <!-- Button --> */}
                    <Link to={`/add-post`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 ease-in-out focus:ring-4 focus:ring-blue-300">
                        Start Writing
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default LoggedInHome;
