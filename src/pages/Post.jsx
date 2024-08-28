import React, { useEffect, useState } from "react";
import { Container, Loader, PostCard2 } from "../components/index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "@/appwrite/config.js";
import authService from "@/appwrite/auth.js";

import { Query } from "appwrite";

function Post() {
  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const { slug } = useParams();
  const [isAuthor, setAuthor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          console.log("in post comp ");
          console.log(post);
          setPost(post);

          authService.getCurrentUser().then((userData) => {
            console.log("In post,jsx");
            console.log(isAuthor);

            if (post && userData) {
              if (post.userId == userData.$id) {
                setAuthor(true);
              } else {
                setAuthor(false);
              }
            }
            console.log(userData.$id);
          });
          appwriteService
            .getPosts([Query.equal("userId", post?.userId)])
            .then((posts) => {
              if (posts) {
                setPosts(posts.documents);
              }
            });
        } else {
          navigate(`/`);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <>
      <Container className={"my-9 "} classNameChild={"md:max-w-[680px]"}>
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
                <button className="px-4 py-2 mr-3 text-white rounded-2xl bg-green-500">
                  Edit
                </button>
              </Link>
              <button
                className="px-4 py-2 text-white rounded-2xl bg-red-500"
                onClick={deletePost}
              >
                Delete
              </button>
            </div>
          )}
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

        <div className="text-[16px] leading-[24px] text-left py-1 mt-7">
          <p>More from the same Author</p>
        </div>
        {/* more posts from same author */}

        <div className="flex flex-wrap justify-center m-3">
          {posts &&
            posts.map((post) => (
              <PostCard2 {...post} className={"w-[300px] m-1"}/>
            ))}
          {/* post card */}
        </div>
      </Container>
    </>
  ) : (
    <Container>
      <Loader isTrue={true} />
    </Container>
  );
}

export default Post;
