import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { TinyMCE } from "./index.js";
import appwriteService from "@/appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "./Container.jsx";
import { addPost, updatePost } from "@/store/postSlice.js";
import { ID } from "appwrite";
import { deleteFunctionality, searchFunctionality } from "@/lib/searchFunctionality.js";

function PostForm({ post }) {
  const { register, handleSubmit, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "Tell Us Your Story...",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const [isInlineEditor, setInlineEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const submit = async (data) => {
    setLoading(true); // Start loading
    setImgError(false); // Reset image error

    try {
      console.log("Data submitted:", data);
      console.log("Post:", post);

      // Image validation for creating a new post
      if (!post && !data.image?.[0]) {
        setImgError(true);
        setLoading(false);
        return; // Stop form submission if image is missing
      }

      if (post) {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined,
        });

        dispatch(
          updatePost({
            postId: post.$id,
            postData: { ...dbPost },
          })
        );

        if (dbPost) {
          deleteFunctionality();
          searchFunctionality();
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          const postIdVal = ID.unique();
          data.featuredImage = file.$id;
          const dbPost = await appwriteService.createPost({
            ...data,
            postId: postIdVal,
            userId: userData.$id,
          });

          dispatch(
            addPost({
              postId: postIdVal,
              postData: dbPost,
            })
          );

          if (dbPost) {
            searchFunctionality();
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false); // End loading
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
        widthOfContainer={"max-sm:max-w-[95%] max-w-[80%]"}
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
              className="w-full text-4xl font-bold text-gray-900 bg-transparent border-none placeholder-gray-500 focus:outline-none focus:ring-0"
              {...register("title", { required: true })}
            />
          </div>

          <TinyMCE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            {...register("content", { required: true })}
          />

          <div className="w-full flex flex-wrap justify-center mt-8">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="featuredImage"
                className="text-sm font-medium text-gray-800 px-4"
              >
                <p className="font-bold">Choose Featured Image:</p>
              </label>
            </div>
            <input
              type="file"
              name="featuredImage"
              accept="image/png, image/jpg, image/jpeg, image/gif, image/webp"
              className="w-auto text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 focus:outline-none focus:ring-0 border-2 border-black"
              {...register("image")}
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

          {imgError && (
            <div className="text-red-600 text-center">
              Image is required for new posts.
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className={`inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 focus:ring-green-600"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : post ? "Update" : "Publish"}
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default PostForm;
