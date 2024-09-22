import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "@/appwrite/config";
import { getComments, formatDate } from "@/lib/helperFunctions";
import { ID } from "appwrite";
import { addComment, deleteComment, updateComment } from "@/store/commentSlice";
import { Loader } from "./index";

const Comments = ({ postId, userData,postAuthorId }) => {
  const [commentValues, setCommentValues] = useState([]);
  const [commentText, setCommentText] = useState("");
  const comments = useSelector((state) => state.comment);
  const [commentError, setCommentError] = useState("");
  const [loaderActive, setLoaderActive] = useState(true);
  const [isEditDeleteEnabled, setEditDeleteEnabled] = useState(false);
  const [updateCommentText,setUpdateComment]=useState(false);
  const [editableCommentText, setEditableCommentText] = useState({});
  const [commentIsUpdating,setCommentIsUpdating] = useState(false);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth);
  const commentsData = useSelector(state=>state.comment);
  const [currUserprofile, setCurrUserProfile] = useState({});
  const userProfileDetails = useSelector(state=>state.userProfile)
  console.log("Printing comments in comments.jsx outside useEffect", comments);
  console.log("post.$id: in comments", postId);
  console.log("userData in comments.jsx ", userData);

  // const comments = [
  //   {
  //     id: 1,
  //     author: "Jane Doe",
  //     date: "September 3, 2024",
  //     content:
  //       "This is an insightful post! I learned a lot from it. Keep up the good work!",
  //   },
  //   {
  //     id: 2,
  //     author: "John Smith",
  //     date: "September 3, 2024",
  //     content:
  //       "I have a different perspective on this topic, but your arguments are well presented.",
  //   },
  //   {
  //     id: 3,
  //     author: "Alice Johnson",
  //     date: "September 2, 2024",
  //     content:
  //       "Great read! Looking forward to more posts like this in the future.",
  //   },
  // ];
  
  useEffect(()=>{
    const val = userProfileDetails.filter(data=>data.userId==postAuthorId)
    console.log('userPrfolifromloggedinnavisfrombigbadge: ',val);
    setCurrUserProfile(val[0]);
  },[currUserprofile,userProfileDetails])

  const addCommentToStore = () => {
    // Add comment logic here
    setLoaderActive(true);
    setCommentError("");
    console.log("initiating publishdb comment with value", commentText);

    const existingComment =
      comments.length > 0 &&
      comments.find(
        (comment) =>
          postId === comment?.postId &&
          userData.$id === comment?.userId &&
          commentText === comment?.commentText
      );
    console.log("prting exiting comments, ", existingComment);
    if(commentText===""){
      setCommentError("Comment Cannot Be Empty!");
      setLoaderActive(false);
    }
    else if (!existingComment) {
      console.log("pritigncommentincommenttextfromcomment.jsx",commentText);
      console.log("its type is ", typeof(commentText));
      console.log(commentText==="");
      
      
      service
        .addComment(
          postId,
          userData.$id,
          userData.name,
          commentText,
          ID.unique()
        )
        .then((response) => {
          console.log("response from comment.jsx ", response);
          dispatch(addComment({ commentData: response }));
          // const filteredComments = getComments(comments, postId);
          // setCommentValues([...comments]);
        })
        .catch((error) => {
          console.log("Error adding comment: ", error);
          setCommentError("Failed to post comment.");
        })
        .finally(() => {
          setLoaderActive(false);
        });
    } else {
      setCommentError("You have already published the same comment!");
      setLoaderActive(false);
    }

    setCommentText("");
  };

  useEffect(() => {
    console.log("Filtering comments for postId:", postId);
    setLoaderActive(true);
    const filteredComments = getComments(comments, postId);
    setCommentValues(filteredComments); // Set filtered comments
    // 2024-09-06T00:51:28.000+00:00
    console.log("Filtered comments:", filteredComments);
    setLoaderActive(false);

    // Avoid using commentValues in dependency to prevent infinite rerender
  }, [postId, comments]); // Trigger on postId or comments change

  const handleEditDeleteComment = (commentId) => {
    setEditDeleteEnabled((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleUpdateComment = (commentId)=>{
    setUpdateComment(prev=>({
      ...prev,
      [commentId]:!prev[commentId],
    }))
  }

  const handleDeleteComment = async (commentId) => {
    setLoaderActive(true);
    const deletecomment = await service.deleteComment(commentId);
    console.log(deletecomment);
    dispatch(deleteComment({ commentId }));
    setLoaderActive(false);
  };

  const handleSubmitUpdatedComment = async (commentId, commentText)=>{
    setCommentIsUpdating(true);
    const updateIt = await service.updateComment(commentId,{commentText});
    dispatch(updateComment({commentId,commentText}));
    setUpdateComment(prev=>({
      ...prev,
      [commentId]:!prev[commentId],
    }))
    setCommentIsUpdating(false);
    
  }
  
  return (
    <div className="max-w-3xl mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Comments</h2>

      {/* Comment Input */}
      <div className="mb-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <div>
          {commentError && (
            <p className="text-red-600 text-center">{commentError}</p>
          )}
        </div>
        <button
          className={`mt-2 rounded-xl px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 ${
            loaderActive
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={addCommentToStore}
          disabled={loaderActive}
        >
          Post Comment
        </button>
      </div>

      {/* Comment List */}
      <div>
        {!loaderActive ? (
          commentValues.length > 0 ? (
            commentValues.map((comment) => {
              const val= userProfileDetails.filter(ele=>ele.userId===comment.userId);
              const valToUse=val?.length>0?val[0]:{userName:'SampleName'};
              return (
              <div key={comment.$id} className="border-b border-gray-200 py-4">
                <div className="flex items-center mb-2 justify-between">
                  <div className="flex items-center flex-wrap">
                    <div className="bg-gray-300 h-10 w-10 rounded-full flex items-center justify-center mr-3 text-left">
                      <span className="text-gray-700 font-bold">
                        {valToUse?.userName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-left">
                        {valToUse?.userName}
                      </h3>
                      <p className="text-sm text-gray-500 text-left">
                        {formatDate(comment.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div>
                    {userData?.$id===comment?.userId && (<button
                      // onMouseOver={() => handleEditDeleteComment(comment.$id)}
                      // onMouseOut={() => handleEditDeleteComment(comment.$id)}
                      onClick={() => handleEditDeleteComment(comment.$id)}
                    >
                      <svg width="25" height="25" class="svgIcon-use">
                        <path
                          fill-rule="evenodd"
                          d="M5 12.5q0 .828.586 1.414.585.585 1.414.586.828 0 1.414-.586.585-.586.586-1.414 0-.828-.586-1.414A1.93 1.93 0 0 0 7 10.5q-.828 0-1.414.586-.585.586-.586 1.414m5.617 0q0 .828.586 1.414.587.585 1.414.586.828 0 1.414-.586t.586-1.414-.586-1.414a1.93 1.93 0 0 0-1.414-.586q-.827 0-1.414.586-.586.586-.586 1.414m5.6 0q0 .828.586 1.414.585.585 1.432.586.827 0 1.413-.586t.587-1.414q0-.828-.587-1.414a1.93 1.93 0 0 0-1.413-.586q-.847 0-1.432.586t-.587 1.414z"
                        ></path>
                      </svg>
                    </button>)}
                    
                  </div>
                </div>
                {isEditDeleteEnabled[comment.$id] && (
                  <div className="relative flex flex-col flex-wrap items-end justify-between">
                    <div onClick={()=>handleUpdateComment(comment.$id)} className="cursor-pointer">Edit Response</div>
                    <div onClick={()=>handleDeleteComment(comment.$id)} className="cursor-pointer">
                      Delete Response
                    </div>
                  </div>
                )}
                
                {updateCommentText[comment.$id]?(
                <div className="flex justify-center align-middle space-x-2 my-3">
                  <input type="text" className="w-full p-2 justify-start border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  value={editableCommentText[comment.$id] || comment.commentText}  
                  onChange={(e) =>
                    setEditableCommentText((prev) => ({
                      ...prev,
                      [comment.$id]: e.target.value, 
                    }))
                  }
                  />
                  <button type="submit" 
                    className={`mt-2 rounded-xl px-4 py-2  text-white  ${
                      commentIsUpdating
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={() => handleSubmitUpdatedComment(comment.$id,editableCommentText[comment.$id] || comment.commentText)}
                    >Update</button>
                </div>
                ):(<p className="text-gray-800 text-left">{comment.commentText}</p>)}
              </div>
            )
            }
          )
          ) : (
            <p>No comments yet for this post.</p>
          )
        ) : (
          <Loader isTrue={loaderActive} minheight="auto" />
        )}
      </div>
    </div>
  );
};

export default Comments;
