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
      if (currUserId && postsData.length > 0) {
        loadPosts(selectedFilter);
      }
    }, [currUserId, postsData, selectedFilter]);

    if (isLoading) {
      return <PostLoader />;
    }

    return (
      <Container>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === "All Posts" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => loadPosts("All Posts")}
          >
            All Posts
          </button>
          <button
            className={`px-4 py-2 rounded ${
              selectedFilter === "Following" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => loadPosts("Following")}
          >
            Following
          </button>
        </div>

        {postsToLoad.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...postsToLoad]
              .sort((a, b) => new Date(b.postData.$createdAt) - new Date(a.postData.$createdAt))
              .map((post) => {
                const likesVal = getLikes(likes, post?.postId);
                const commentVal = getComments(comments, post?.postId);
                return (
                  <PostCard
                    key={post.postId}
                    {...post.postData}
                    likesVal={likesVal}
                    commentVal={commentVal}
                  />
                );
              })}
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4">No posts to display</h2>
            <p className="mb-4">
              {selectedFilter === "Following"
                ? "Follow some people to see their posts!"
                : "Start by creating your first post or follow some people."}
            </p>
            <Link
              to="/add-post"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create a Post
            </Link>
          </div>
        )}
      </Container>
    );
  }

  export default LoggedInHome;
