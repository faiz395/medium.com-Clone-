import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // {
  //   "postId": "66ce34810036ecd2ebf3",
  //   "userId": "66cec83300158c872897",
  //   "userName": "username", =>can accessusetname from userdata.name
  //   "commentText": "Great Post!",
  //   "timestamp": "2024-09-06T00:51:28.000+00:00",
  //   "status": "active",
  //   "$id": "66da04cd0017c7381afb",
  //   "$tenant": "187465",
  //   "$createdAt": "2024-09-05T19:22:09.168+00:00",
  //   "$updatedAt": "2024-09-05T19:22:09.168+00:00",
  //   "$permissions": [],
  //   "$databaseId": "66c3489b0021873c518c",
  //   "$collectionId": "66d43b61000ee78148a0"
  // },
];

const commentsSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    // Add a comment
    addComment: (state, action) => {
      const {commentData}= action.payload;
      console.log("pritingcommentdatafromstoreaddcomment ",commentData);
      console.log("prting nitial state ",state);
      
      
      const existingComment = state.length>0 && state.find(
        (comment) => commentData.postId === comment?.postId && commentData.userId === comment?.userId && commentData.commentText === comment?.commentText
      );
      console.log("existing comments are :",existingComment);
      
      if (!existingComment) {
        state.unshift(commentData);
        console.log("in commentdata pushed ", commentData);
      }
      else {
        console.log("No comment is pushed");
      }
      // const { postId, userId, userName, commentText, timestamp } = action.payload;
      // if (!state[postId]) {
      //   state[postId] = [];
      // }
      // state[postId].push({
      //   userId,
      //   userName,
      //   commentText,
      //   timestamp,
      // });
    },
    
    // Update a comment
    updateComment: (state, action) => {
      const { commentId, commentText} = action.payload;
      // if (state[postId]) {
      //   const comment = state[postId].find(c => c.userId === userId && c.timestamp === timestamp);
      //   if (comment) {
      //     comment.commentText = commentText;
      //   }
      // }
      return state.map(comment=>(
        comment.$id==commentId?{...comment,commentText}:comment
      ))
    },
    // Delete a comment
    deleteComment: (state, action) => {
      const { commentId } = action.payload;
      // const { postId, userId, timestamp } = action.payload;
      // if (state[postId]) {
      //   state[postId] = state[postId].filter(c => !(c.userId === userId && c.timestamp === timestamp));
      // }
      // // If no comments are left for the post, remove the postId key
      // if (state[postId] && state[postId].length === 0) {
      //   delete state[postId];
      // }
      return state.filter(comment=>comment.$id!=commentId);
    },
    // Clear all comments (for a specific post or all posts)
    clearComments: (state, action) => {
      const { postId } = action.payload;
      if (postId) {
        delete state[postId];
      } else {
        return initialState;
      }
    }
  }
});

export const { addComment, updateComment, deleteComment, clearComments } = commentsSlice.actions;

export default commentsSlice.reducer;

/*

Explanation:
State Structure:

The state is an object where each key is a postId, and the value is an array of comment objects.
Each comment object contains userId, userName, commentText, and timestamp.
Reducers:

addComment: Adds a comment to the appropriate post. If the post doesn't have any comments yet, it initializes the array.
updateComment: Finds and updates a specific comment for a post based on userId and timestamp.
deleteComment: Removes a specific comment from a post based on userId and timestamp.
clearComments: Clears comments for a specific post or all posts.
Usage:
Dispatching Actions: You can dispatch actions like addComment, updateComment, deleteComment, and clearComments to manage the comments state in your application.
This structure and the corresponding reducers should help you efficiently perform CRUD operations on the comments in your React application.
*/
