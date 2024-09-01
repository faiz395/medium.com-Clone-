import React, { useId, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { TinyMCE } from "./index.js";
import appwriteService from "@/appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "./Container.jsx";
import authService from "@/appwrite/auth.js";

function PostForm({ post }) {
  
  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const [isInlineEditor, setInlineEditor] = useState(false);
  const userData = useSelector(state => state.auth.userData);
  console.log("in post form UserData is ");
  console.log({userData});
  console.log("In post form after clik on edit");
  // console.log({post});
  // console.log(post.content);

  const submit = async (data) => {
    // const userData = await authService.getCurrentUser();

    console.log("data val is");
    console.log(data);
    console.log("post val is");
    console.log(post);
    
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      // console.log("DbPost is");
      // console.log(dbPost);

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0]
      ? await appwriteService.uploadFile(data.image[0])
      : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const handleToggle = () => {
    setInlineEditor(!isInlineEditor);
  };

  return (
    <>
      <Container
        className={"bg-white min-h-screen"}
        classNameChild={"md:max-w-[800px]"}
        widthOfContainer={'max-sm:max-w-[95%] max-w-[80%]'}
      >
        <form onSubmit={handleSubmit(submit)} className="space-y-8 p-6">
         
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-gray-800 mb-2"
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              id={useId()}
              required
              className="w-full text-4xl font-bold text-gray-900 bg-transparent border-none  placeholder-gray-500 focus:outline-none focus:ring-0"
              {...register("title", { required: true })}
            />
          </div>
            <TinyMCE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
              {...register("content",{required:true})}  
            />
          <div className="w-full flex flex-wrap justify-center mt-8 ">
            <div className="flex items-center justify-between mb-2 ">
              <label
                htmlFor="featuredImage"
                className="text-sm  font-medium text-gray-800 px-4"
              >
                <p className="font-bold">Choose Featured Image:</p>
              </label>
            </div>
            <input
              type="file"
              name="featuredImage"
              accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
              className="w-auto text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 focus:outline-none focus:ring-0 border-2 border-black"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full mt-4">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-md"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              {post ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default PostForm;

{
  /*
   <div>
            <div className="flex items-center space-x-3 mt-4">
              <span className="text-lg font-medium">Inline Editor:</span>
              <button
                onClick={handleToggle}
                className={`w-12 h-6 rounded-full p-1 transition duration-300 ease-in-out ${
                  isInlineEditor ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                    isInlineEditor ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
           
            <p className="mt-2 text-sm text-gray-600">
              {isInlineEditor
                ? "Inline editor enabled"
                : "Inline editor disabled"}
            </p>
          </div>
  */
}
