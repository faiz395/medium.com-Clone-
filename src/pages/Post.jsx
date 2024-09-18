import React, { useEffect, useState } from "react";
import {
  Comments,
  Container,
  Loader,
  PostCard2,
  ProfileBadgeSmall,
  ProfileBadgeBig,
  SinglePostSkeleton,
} from "../components/index.js";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "@/appwrite/config.js";
import authService from "@/appwrite/auth.js";
import { addPost, deletePost } from "@/store/postSlice.js";
import { addLike, removeLike } from "@/store/likeSlice.js";
import { addFollow, removeFollow, clearFollow } from "@/store/followSlice.js";
import { ID } from "appwrite";
import { Query } from "appwrite";
import {
  getLikes,
  getLikesForUser,
  getComments,
  formatDate,
  getFollowersByuserId,
  getFollowerByuserIdAndFollowerId,
} from "@/lib/helperFunctions.js";
import service from "@/appwrite/config.js";

function Post() {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const { slug } = useParams();
  const [isAuthor, setAuthor] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [likesCount, setLikesCount] = useState(0);
  const [isLoaderActive, setIsLoaderActive] = useState(true);

  const userData = useSelector((state) => state.auth.userData);
  const postsData = useSelector((state) => state.post);
  const likesData = useSelector((state) => state.like);
  const commentsData = useSelector((state) => state.comment);
  const followData = useSelector((state) => state.follow);
  // console.log("likesDatadefaul ",likesData);

  const deletePostNow = () => {
    appwriteService
      .deletePost(post.$id)
      .then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          dispatch(deletePost(post.$id));
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLike = async () => {
    if (!userData || !post) return;

    // console.log("from app.jsx: likesData: ", likesData);

    const existingLike = getLikesForUser(likesData, post.$id, userData.$id);
    // console.log("existing like ", existingLike);

    if (existingLike.length > 0) {
      const likeToRemove = existingLike;
      // console.log("like to remove: ",likeToRemove);

      if (likeToRemove.length > 0) {
        likeToRemove.forEach(async (ele) => {
          await appwriteService.removeLike(ele.$id);
          dispatch(removeLike({ postId: post.$id, userId: userData.$id }));
        });
        setLikesCount((prevCount) => prevCount - 1);
      }
    } else {
      // Add like
      // console.log("post.jsx: adding like");

      const response = await appwriteService.addLike(
        post.$id,
        userData.$id,
        ID.unique()
      );
      // console.log("response is :: ",response);

      dispatch(addLike({ likeData: response }));
      setLikesCount((prevCount) => prevCount + 1);
    }
  };

  // const handleComment = async () => {
  //   if (!userData || !post) return;

  //   console.log("from app.jsx: commentsData: ", commentsData);

  //   const existingComment = getComments(commentsData,post.$id)
  //   console.log("existingComment ", existingComment);

  //   if (existingComment.length>0) {
  //     const CommentToRemove = existingComment;
  //     // console.log("like to remove: ",likeToRemove);
  //     if (CommentToRemove.length>0) {
  //       likeToRemove.forEach(async(ele)=> {
  //         await appwriteService.removeLike(ele.$id);
  //         dispatch(removeLike({ postId: post.$id, userId: userData.$id }));
  //       })
  //       setLikesCount((prevCount) => prevCount - 1);
  //     }
  //   } else {
  //     // Add like
  //     // console.log("post.jsx: adding like");

  //     const response = await appwriteService.addLike(
  //       post.$id,
  //       userData.$id,
  //       ID.unique()
  //     );
  //     // console.log("response is :: ",response);

  //     dispatch(addLike({likeData: response }));
  //     setLikesCount((prevCount) => prevCount + 1);
  //   }
  // };

  
  useEffect( () => {
    // authService.getAllTheUsers()
    // .then((res)=>{
    //   console.log("listingalltheusersfrompost.jsx: ",res);
    // })
    // .catch((err)=>{
    //   console.log("error is ",err); 
    // })
    
    if (slug) {
      if (postsData) {
        const [result] = postsData.filter(
          (postValues) => postValues.postId == slug
        );

        if (result) {
          setPost(result.postData);
          setAuthor(result.postData.userId === userData?.$id);

          const allPosts = postsData?.filter(
            (postVal) => postVal.postData?.userId === result.postData.userId
          );

          if (allPosts) {
            setPosts(allPosts);
          }

          // Update likes count
          const likesForPost = getLikes(likesData, result.postId);
          if (likesForPost) {
            setLikesCount(likesForPost?.length);
          }

          const filteredComments = getComments(commentsData, result.postId);
          setPostComments([...filteredComments]);
        } else {
          navigate("/"); // Navigate away if post is not found
        }
      } else {
        navigate("/");
      }
      setIsLoaderActive(false);
    } else {
      navigate("/");
    }
  }, [slug, navigate, userData, postsData, likesData]);

  console.log("post.$id: ", post);
  console.log(typeof post);
  return post ? (
    <>
      <Container
        className={"my-9 "}
        classNameChild={"md:max-w-[680px]"}
        widthOfContainer={"max-sm:max-w-[85%] max-w-[80%]"}
      >
        {isLoaderActive && <SinglePostSkeleton isActive={isLoaderActive} />}
        {!isLoaderActive && (
          <>
            <div>
              <h1 className="text-[32px] leading-[38px] font-bold text-left lg:text-[42px] lg:leading-[52px]">
                {post?.title || "Empty title"}
              </h1>
            </div>
            {/* <div className="">
          <p className="text-[16px] leading-[24px] text-left py-1">
            Author Name Here
          </p>
        </div> */}
            <div>
              {isAuthor && (
                <div className="flex flex-wrap p-2 right-6 top-6">
                  <Link to={`/edit-post/${post.$id}`}>
                    <button className=" px-4 py-2 mr-3 text-white rounded-2xl bg-green-500">
                      <span>
                        <i class="bi bi-pencil-square"></i>
                      </span>
                      <span className="max-sm:hidden"> Edit</span>
                    </button>
                  </Link>
                  <button
                    className="px-4 py-2 text-white rounded-2xl bg-red-500"
                    onClick={deletePostNow}
                  >
                    <span>
                      <i class="bi bi-trash"></i>
                    </span>
                    <span className="max-sm:hidden"> Delete</span>
                  </button>
                </div>
              )}
            </div>
            <ProfileBadgeSmall
              postAuthorId={post?.userId}
              followerId={userData?.$id}
            />
            <div className="text-left flex space-x-2 my-3">
              <div className="flex items-center space-x-[4px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 64 64"
                >
                  <path
                    fill="#FFC017"
                    d="m39.637 40.831-5.771 15.871a1.99 1.99 0 0 1-3.732 0l-5.771-15.87a2.02 2.02 0 0 0-1.194-1.195L7.298 33.866a1.99 1.99 0 0 1 0-3.732l15.87-5.771a2.02 2.02 0 0 0 1.195-1.194l5.771-15.871a1.99 1.99 0 0 1 3.732 0l5.771 15.87a2.02 2.02 0 0 0 1.194 1.195l15.871 5.771a1.99 1.99 0 0 1 0 3.732l-15.87 5.771a2.02 2.02 0 0 0-1.195 1.194"
                  ></path>
                </svg>
                <span className="text-[13px] text-[#6b6b6b]">
                  {formatDate(post?.$createdAt)}
                </span>
              </div>
              <div
                className="flex items-center space-x-[4px] hover:cursor-pointer"
                onClick={handleLike}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#6B6B6B"
                    fill-rule="evenodd"
                    d="m3.672 10.167 2.138 2.14h-.002c1.726 1.722 4.337 2.436 5.96.81 1.472-1.45 1.806-3.68.76-5.388l-1.815-3.484c-.353-.524-.849-1.22-1.337-.958-.49.261 0 1.56 0 1.56l.78 1.932L6.43 2.866c-.837-.958-1.467-1.108-1.928-.647-.33.33-.266.856.477 1.598.501.503 1.888 1.957 1.888 1.957.17.174.083.485-.093.655a.56.56 0 0 1-.34.163.43.43 0 0 1-.317-.135s-2.4-2.469-2.803-2.87c-.344-.346-.803-.54-1.194-.15-.408.406-.273 1.065.11 1.447.345.346 2.31 2.297 2.685 2.67l.062.06c.17.175.269.628.093.8-.193.188-.453.33-.678.273a.9.9 0 0 1-.446-.273S2.501 6.84 1.892 6.23c-.407-.406-.899-.333-1.229 0-.525.524.263 1.28 1.73 2.691.384.368.814.781 1.279 1.246m8.472-7.219c.372-.29.95-.28 1.303.244V3.19l1.563 3.006.036.074c.885 1.87.346 4.093-.512 5.159l-.035.044c-.211.264-.344.43-.74.61 1.382-1.855.963-3.478-.248-5.456L11.943 3.88l-.002-.037c-.017-.3-.039-.71.203-.895"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="text-[13px] text-[#6b6b6b]">{likesCount}</span>
              </div>
              <div className="flex items-center space-x-[4px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#6B6B6B"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#6B6B6B"
                    d="M12.344 11.458A5.28 5.28 0 0 0 14 7.526C14 4.483 11.391 2 8.051 2S2 4.483 2 7.527c0 3.051 2.712 5.526 6.059 5.526a6.6 6.6 0 0 0 1.758-.236q.255.223.554.414c.784.51 1.626.768 2.512.768a.37.37 0 0 0 .355-.214.37.37 0 0 0-.03-.384 4.7 4.7 0 0 1-.857-1.958v.014z"
                  ></path>
                </svg>
                <span className="text-[13px] text-[#6b6b6b]">
                  {postComments?.length}
                </span>
              </div>
            </div>
            <div className="py-4 flex justify-center">
              {/* image will go here */}
              <img
                src={appwriteService.getFilePreview(post?.featuredImage)}
                alt=""
              />
            </div>
            <div className="text-[18px] leading-[28px] lg:text-[20px] lg:leading-[32px]">
              {parse(post.content)}
            </div>

            {/* comments */}
            <Comments postId={post.$id} userData={userData} />

            <ProfileBadgeBig
              postAuthorId={post?.userId}
              followerId={userData?.$id}
            />
            <div className="text-[16px] leading-[24px] text-left py-1 mt-7">
              <p>More from the same Author:</p>
            </div>
            {/* more posts from same author */}

            <div className="flex flex-wrap justify-center m-3">
              {posts &&
                posts.map((post) => {
                  const likesVal = getLikes(likesData, post.postId);
                  const commentArray = commentsData.filter(
                    (comment) => comment.postId === post.postId
                  );
                  // console.log("Pritingpostfrompostcard2");
                  // console.log(post);
                  // console.log("likesVal priting: ",likesVal);
                  return (
                    <div key={post.postId} onClick={window.scrollTo(0, 0)}>
                      <PostCard2
                        {...post.postData}
                        likesCount={likesVal?.length}
                        commentsCount={commentArray?.length}
                        publishdate={formatDate(post.postData?.$createdAt)}
                        className={"w-[300px] m-1"}
                      />
                    </div>
                  );
                })}
              {/* post card */}
            </div>
          </>
        )}
      </Container>
    </>
  ) : (
    <Container>
      <Loader isTrue={true} />
    </Container>
  );
}

export default Post;
