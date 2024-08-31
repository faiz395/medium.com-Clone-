import React, { useState, useEffect } from "react";
import { PostCard, PostCard2, Container } from "@/components/index.js";
import appwriteService from "@/appwrite/config";
import { LoggedOutHome } from "./index.js";
import authService from "@/appwrite/auth.js";

function LoggedInHome() {
  const [posts, setPosts] = useState([]);
  const [currUserId, setCurrUserId] = useState("");

  useEffect(() => {
    appwriteService.getPosts().then((post) => {
      // console.log("In get posts ", post);
      if (post) {
        setPosts(post.documents);

        authService.getCurrentUser().then((userData) => {
          // console.log("In post,jsx");
          setCurrUserId(userData.$id);
          // console.log(userData.$id);
        });
      }
    });
  }, []);
  // console.log(posts);

  if (posts?.length == 0) {
    return <LoggedOutHome />;
  }
  return (
    <Container>
      <div className="flex flex-wrap">
        <div className="lg:w-2/3 px-2">
          <h2 className="text-center font-bold text-[30px] my-4">All Posts</h2>
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
        <div className="lg:w-1/3 px-2">
          <h2 className="text-center font-bold text-[30px] my-4">Your Posts</h2>
          <div className="flex flex-wrap justify-center">
            {posts.map((post) => (
              (currUserId==post.userId)&&
              <div key={post.$id}>
                <PostCard2 {...post} className="max-w-[350px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LoggedInHome;
