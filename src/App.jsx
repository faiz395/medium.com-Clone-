import "./App.css";
import { useEffect, useState, useCallback } from "react";
import { Header, Footer, Loader } from "./components/index";
import { logout, login } from "./store/authSlice";
import { addPost, clearPosts } from "./store/postSlice";
import { addLike, removeAllLikes } from "./store/likeSlice";
import { addFollow, clearFollow } from "./store/followSlice";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import service from "./appwrite/config";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { addComment } from "./store/commentSlice";
import {
  searchFunctionality,
  deleteFunctionality,
} from "./lib/searchFunctionality";
import parse from "html-react-parser";
import { addProfile, clearProfile } from "./store/userProfileSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  const likes = useSelector((state) => state.like);
  const comments = useSelector((state) => state.comment);
  const followers = useSelector((state) => state.follow);
  const authStatus = useSelector((state) => state.auth.status);

  const userProfile = useSelector((state) => state.userProfile);
  console.log("fetched comment from store: " + comments);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();


  // add all the posts
  useEffect(() => {
    deleteFunctionality();
    searchFunctionality();
  }, [posts]);

  useEffect(() => {
    if (authStatus) {
      navigate('/home'); // Redirect to the original URL or "/home"
    }
  }, [authStatus, navigate]);

  const fetchUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        dispatch(login(currentUser));
        navigate("/home"); // Redirect to logged-in home
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const fetchFollowers = async () => {
    if (followers.length == 0) {
      dispatch(clearFollow());
      try {
        const followerDetails = await service.getFollowers();
        console.log("logfromfetchfollowersinapp.jsx");
        console.log(followerDetails);
        if (followerDetails && followerDetails.documents.length > 0) {
          followerDetails.documents.forEach((ele) => {
            dispatch(addFollow(ele));
          });
        }
      } catch (error) {
        console.log("Error from fetchFollowers", error);
      }
    }
  };

  const fetchUserProfile = async () => {
    if (userProfile?.length == 0) {
      dispatch(clearProfile());
      try {
        const getUserProfileDetails = await service.getUserProfiles();
        console.log("logfromfetchuserprofileinapp.jsx");
        console.log(getUserProfileDetails);
        if (
          getUserProfileDetails &&
          getUserProfileDetails.documents.length > 0
        ) {
          getUserProfileDetails.documents.forEach((ele) => {
            dispatch(addProfile(ele));
          });
        }
      } catch (error) {
        console.log("Error from fetchFollowers", error);
      }
    }
  };

  const fetchPosts = useCallback(
    async () => {
      if (posts.length === 0) {
        try {
          console.log("Fetching posts...");
          dispatch(clearPosts());
          const postVal = await service.getPosts();
          console.log("Posts fetched:");
          // console.log(postVal);

          if (postVal && postVal.documents.length > 0) {
            for (const postData of postVal.documents) {
              dispatch(
                addPost({
                  postId: postData.$id,
                  postData: postData,
                })
              );
            }
            // console.log("Showing likes (before check): ", likes);
            // Fetch likes only if they are not already present
            // const existingLikes = likes;
            // console.log("Showing existing likes: ", likes);

            // const user = await authService.getCurrentUser();
            if (likes.length == 0) {
              try {
                const likeData = await service.getLikes();

                if (likeData && likeData.documents.length > 0) {
                  // console.log("Likes data fetched: ", likeData);
                  // console.log("userdata: ", user);
                  // console.log("calling dispatch in app.jsx");
                  // passing array here for response: likeData.documents, but in postSLice is expecting a value
                  if (Array.isArray(likeData.documents)) {
                    likeData.documents.forEach((data) => {
                      // console.log("priting foreach data ",data);

                      dispatch(addLike({ likeData: data }));
                    });
                  }
                }
              } catch (error) {
                console.error(`Error fetching likes:`, error);
              }
              // console.log("Likes state after dispatch and after existing likes: ", likes);
            }

            if (comments.length == 0) {
              try {
                const commentdata = await service.getComments();
                console.log("Commentdata ", commentdata);
                // const commentdata =commentdataUnsorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                if (commentdata && commentdata.documents.length > 0) {
                  if (Array.isArray(commentdata.documents)) {
                    commentdata.documents.forEach((element) => {
                      console.log(
                        "InforeachLoopDispatching comment data",
                        element
                      );
                      dispatch(addComment({ commentData: element }));
                    });
                  }
                }
              } catch (error) {
                console.error(`Error fetching comments:`, error);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    },
    [dispatch, posts.length, likes, comments] // Removed 'likes' dependency from here
  );

  useEffect(() => {
    // fetchUser();
    fetchUserProfile();
    fetchPosts();
    fetchFollowers();
    setLoading(false);
  }, [fetchPosts, fetchUser]);

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen flex flex-col">
      <div className="w-full block">
        <Header />
      </div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
