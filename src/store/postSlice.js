import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    // {
    //     "postId": "66cf08d0002f785635f1",
    //     "postData": {
    //         "title": "What is Next JS and Why Should You Use it?",
    //         "content": "<p style=\"text-align: left;\">One of the top benefits of learning what is Next.js is the knowledge of how flexible you can become in building, and adapting to online reality. Internally as the provider of&nbsp;<a href=\"https://pagepro.co/services/nextjs-development\" target=\"_blank\" rel=\"noreferrer noopener\">Next js development services</a>, we think it&rsquo;s the single most important advantage in software development, as we can quickly try and test our ideas. If we succeed, we can easily add new features and&nbsp;<strong>react to changes much faster</strong> than ever before to stay competitive. If not, it&rsquo;s easier to rebuild the entire strategy and adapt accordingly.</p>\n<p style=\"text-align: left;\">&nbsp;</p>\n<p style=\"text-align: left;\">Another thing is the way we buy today. That also went crazy.</p>\n<p style=\"text-align: left;\">&nbsp;</p>\n<p style=\"text-align: left;\">",
    //         "featuredImage": "66cf1a810037d89c107e",
    //         "status": "active",
    //         "userId": "66cec83300158c872897",
    //         "category": "Uncategorized",
    //         "$id": "66cf08d0002f785635f1",
    //         "$tenant": "187465",
    //         "$createdAt": "2024-08-28T11:24:04.363+00:00",
    //         "$updatedAt": "2024-09-01T20:13:21.407+00:00",
    //         "$permissions": [
    //             "read(\"user:66cec83300158c872897\")",
    //             "update(\"user:66cec83300158c872897\")",
    //             "delete(\"user:66cec83300158c872897\")"
    //         ],
    //         "$databaseId": "66c3489b0021873c518c",
    //         "$collectionId": "66c349e9000d49889571"
    //     }
    // }
];


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      addPost: (state, action) => {
        const existingPost = state.find(post => post.postId === action.payload.postId);
        if (!existingPost) {
          state.push({
            postId: action.payload.postId,
            postData: action.payload.postData,
          });
        }
      },
      updatePost: (state, action) => {
        return state.map((postItem) =>
          postItem.postId !== action.payload.postId
            ? postItem
            : { ...postItem, postData: action.payload.postData }
        );
      },

    //   passed postId string in action.payload
      deletePost: (state, action) => {
        console.log("Deleting post with ID:", action.payload);
        return state.filter((postItem) => postItem.postId !== action.payload);
      },
      clearPosts: (state) => {
        return [];
      }
    }
  });
  
  export const { addPost, deletePost, updatePost, clearPosts } = postSlice.actions;
  export default postSlice.reducer;