import React, { useState, useEffect } from "react";
import {
  PostCard,
  PostCard2,
  Container,
  PostLoaderSingleSkeleton,
} from "@/components/index.js";
import appwriteService from "@/appwrite/config";
import authService from "@/appwrite/auth.js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getLikes, getComments, formatDate } from "@/lib/helperFunctions.js";
import { PostLoader } from "@/components/index.js";
import { addPost, clearPosts } from "@/store/postSlice";
import { addLike } from "@/store/likeSlice";
import { addComment } from "@/store/commentSlice";
import { addFollow } from "@/store/followSlice";

function LoggedInHome() {
  const [currUserId, setCurrUserId] = useState("");
  const [postsToLoad, setPostsToLoad] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All Posts");
  const [currUserPosts,setCurrUserPosts]=useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postsData = useSelector((state) => state.post);
  const likes = useSelector((state) => state.like);
  const comments = useSelector((state) => state.comment);
  const userData = useSelector((state) => state.auth);
  const followData = useSelector((state) => state.follow);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setCurrUserId(currentUser.$id);
          await fetchPosts();
          await fetchLikes();
          await fetchComments();
          await fetchFollowers();
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const postVal = await appwriteService.getPosts();
      dispatch(clearPosts());
      if (postVal && postVal.documents.length > 0) {
        postVal.documents.forEach((postData) => {
          dispatch(addPost({ postId: postData.$id, postData }));
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const likeData = await appwriteService.getLikes();
      if (likeData && likeData.documents.length > 0) {
        likeData.documents.forEach((data) => {
          dispatch(addLike({ likeData: data }));
        });
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentData = await appwriteService.getComments();
      if (commentData && commentData.documents.length > 0) {
        commentData.documents.forEach((element) => {
          dispatch(addComment({ commentData: element }));
        });
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchFollowers = async () => {
    try {
      const followerDetails = await appwriteService.getFollowers();
      if (followerDetails && followerDetails.documents.length > 0) {
        followerDetails.documents.forEach((ele) => {
          dispatch(addFollow(ele));
        });
      }
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const getAllTheInfluencersBasedOnFollowerdId = (userId) => {
    const allTheInfluencers = followData
      .filter((ele) => ele.userId_follower === userId)
      .map((val) => val.userId_following);
    return postsData.filter((postVal) =>
      allTheInfluencers.includes(postVal.postData.userId)
    );
  };

  const loadPosts = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All Posts") {
      setPostsToLoad(postsData);
    } else if (filter === "Following") {
      const followingPosts = getAllTheInfluencersBasedOnFollowerdId(currUserId);
      setPostsToLoad(followingPosts);
    }
  };

  useEffect(() => {
    if (currUserId && postsData && postsData.length > 0) {
      loadPosts(selectedFilter);
      const postsForCurrUser = postsData.filter(ele=>ele.postData.userId==currUserId);
      setCurrUserPosts(postsForCurrUser);
    }
  }, [currUserId, postsData, selectedFilter,currUserPosts]);

  if (isLoading) {
    return (
    <>
    <Container widthOfContainer={"max-sm:max-w-[90%] max-w-[80%]"}>
    <div className="flex flex-wrap">
    <div className="max-md:w-full lg:w-2/3 px-1 ">
    
    <PostLoader /> 
    </div>
    <div className="max-mid:w-full lg:w-1/3 px-2  block max-md:hidden">
    <PostLoaderSingleSkeleton isActive={isLoading} />
    </div>
    </div>
    </Container>
    </>)
  }

  return (
    <Container widthOfContainer={"max-sm:max-w-[90%] max-w-[80%]"}>
      <div className="flex flex-wrap">
        <div className="max-md:w-full lg:w-2/3 px-1 ">
          <>
            <div className="w-full bg-white p-4 flex  justify-start">
              <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                <button
                  className={`px-4 py-2 text-sm ${
                    selectedFilter === "All Posts"
                      ? "border-b-2 border-black text-black"
                      : " text-gray-600"
                  } transition-colors hover:bg-black hover:text-white`}
                  onClick={() => loadPosts("All Posts")}
                >
                  All Posts
                </button>

                <button
                  className={`py-2 px-4  text-sm  ${
                    selectedFilter === "Following"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-600"
                  }`}
                  onClick={() => loadPosts("Following")}
                >
                  Following
                </button>
              </div>
            </div>

            {postsToLoad.length > 0 ? (
              [...postsToLoad]
                .sort(
                  (a, b) =>
                    new Date(b.postData.$createdAt) -
                    new Date(a.postData.$createdAt)
                )
                .map((post) => {
                  const likesVal = getLikes(likes, post?.postId);
                  const commentVal = getComments(comments, post?.postId);
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
        </div>

        <div className="max-mid:w-full lg:w-1/3 px-2  block max-md:hidden">
          <>
              <h2 className="text-center font-bold text-[30px] my-4">
                Your Posts
              </h2>
              <div className="flex flex-wrap justify-center">
                {currUserPosts.length>0 &&
                  [...currUserPosts]  
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
                            publishdate={formatDate(post.postData.$createdAt)}
                            className="max-w-[350px]"
                          />
                        </div>
                      );
                    })}
                {currUserPosts.length == 0 && (
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
        </div>
      </div>
    </Container>
  );
}

export default LoggedInHome;
