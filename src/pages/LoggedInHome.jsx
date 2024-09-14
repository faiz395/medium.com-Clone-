import React, { useState, useEffect } from "react";
import { PostCard, PostCard2, Container } from "@/components/index.js";
import appwriteService from "@/appwrite/config";
import { LoggedOutHome } from "./index.js";
import authService from "@/appwrite/auth.js";
import postSlice from "../store/postSlice.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLikes, getComments,formatDate } from "@/lib/helperFunctions.js";


function LoggedInHome() {
  // const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState("");
  const posts = useSelector((state) => state.post);
  const comments = useSelector(state=>state.comment)
  const navigate = useNavigate();
  // console.log("post from store");
  const likes = useSelector(state=>state.like);
  const userData = useSelector(state=>state.auth);
  console.log("Priting like from logged in home");
  console.log(likes);
  
  // console.log(postFromStore);

  useEffect(() => {
    // Assuming you have a function to get the current user
    authService.getCurrentUser().then((userData) => {
      setCurrUserId(userData.$id);
    });
  }, []);

  if (posts?.length == 0) {
    return <LoggedOutHome />;
  }

  return (
    <Container widthOfContainer={'max-sm:max-w-[90%] max-w-[80%]'}>
      <div className="flex flex-wrap">
        <div className="lg:w-2/3 px-1">
          <h2 className="text-center font-bold text-[30px] my-4">All Posts</h2>
          {posts.map((post) => {
            console.log("postVal in map ",post);
            const likesVal = getLikes(likes,post.postId);
            console.log("likesVal priting: ",likesVal);
            const commentVal = getComments(comments, post.postId);
            console.log("postvalinmap, ",post);
            return (<div key={post.postId}>
              <PostCard {...post.postData} likesCount={likesVal?.length} commentsCount={commentVal?.length} pulishdate={formatDate(post.postData.$createdAt)}/>
            </div>);
          })}
        </div>
        <div className="lg:w-1/3 px-2">
          <h2 className="text-center font-bold text-[30px] my-4">Your Posts</h2>
          <div className="flex flex-wrap justify-center">
            {posts
            .filter((post) => post.postData.userId === currUserId)
            .map((post) => {
              const likesVal = getLikes(likes,post.postId);
              const commentVal = getComments(comments, post.postId);
              
              
              return(
                <div key={post.postId}>
                  <PostCard2 {...post.postData} likesCount={likesVal?.length} commentsCount={commentVal?.length} pulishdate={formatDate(post.postData.$createdAt)} className="max-w-[350px]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LoggedInHome;
