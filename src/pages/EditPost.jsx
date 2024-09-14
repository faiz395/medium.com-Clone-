import React, { useState, useEffect } from "react";
import { Container, PostForm } from "@/components/index.js";
import appwriteService from "@/appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const postsData = useSelector((state) => state.post);

  useEffect(() => {
    if (postsData) {
      const [result] = postsData.filter(
        (postValues) => postValues.postId == slug
      );
      console.log("Printing result");
      console.log(result);
      console.log(result?.postData);
      if (result) {
        setPost(result.postData);
      }
    } else {
      navigate("/");
    }
  }, [slug, navigate,postsData]);
  // console.log("post val is ");
  // console.log({post});

  // console.log("Slug val is "+slug);

  return post ? <PostForm post={post} /> : null;
}

export default EditPost;
