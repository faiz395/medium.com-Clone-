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
import { useNavigate, Outlet } from "react-router-dom";
import { addComment } from "./store/commentSlice";
// import algoliasearch from "algoliasearch"; // Import from 'algoliasearch/lite'
import { searchFunctionality} from "./lib/searchFunctionality";
import parse from "html-react-parser";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  const likes = useSelector((state) => state.like);
  const comments = useSelector((state) => state.comment);
  const followers = useSelector((state) => state.follow);
  console.log("fetched comment from store: " + comments);
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Initialize Algolia client
  // const searchClient = algoliasearch(
  //   "A6775ZQA6S",  // Application ID
  //   "e8b4a460b4f2f154093c3e2492a48723" // Search-Only API Key
  // );

  // // Initialize index
  // const index = searchClient.initIndex("demo_ecommerce");
  // fetch('https://alg.li/doc-ecommerce.json')
  // .then(function(response) {
  //   return response.json()
  // })
  // .then(function(products) {
  //   return index.saveObjects(products, {
  //     autoGenerateObjectIDIfNotExist: true
  //   })
  // })

  // useEffect(()=>{
  //   searchFunctionality();
  // },[])

  // useEffect(() => {
  //   const uploadToAlgolia = async () => {
  //     try {
  //       const articles = await service.getPosts();
  //       console.log("articles from service: ", articles);

  //       const valuesToUpload = articles.documents.map((ele) => ({
  //         ...ele,
  //         featuredImage: `https://cloud.appwrite.io/v1/storage/buckets/66c35271002418f1038d/files/${ele.featuredImage}/preview?project=66c33365000fe9ad0224`,
  //       }));

  //       await index.saveObjects(valuesToUpload, {
  //         autoGenerateObjectIDIfNotExist: true,
  //       });

  //       console.log("Algolia upload success");
  //     } catch (error) {
  //       console.error("Error uploading to Algolia:", error);
  //     }
  //   };

  //   uploadToAlgolia();
  // }, [index, service]);

  // console.log();

  // const searchFunctionality = async ()=>{

  // }

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

  const fetchUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        dispatch(login(currentUser));
        console.log("printing curr user ", currentUser);
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    
    fetchUser();
    fetchPosts(); // Removed 'likes' from here
    fetchFollowers();
    setLoading(false);
  }, [fetchPosts, fetchUser]);

  return !loading ? (
    <div className="h-auto">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <Loader />
  );
}

export default App;
