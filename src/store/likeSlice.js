import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    // {
    //     "postId": "66ce34810036ecd2ebf3",
    //     "userId": "66cd638d000ce14cdb70",
    //     "timestamp": "2024-09-05T09:39:45.769+00:00",
    //     "status": "active",
    //     "$id": "66d92f13003cb38a0c25",
    //     "$tenant": "187465",
    //     "$createdAt": "2024-09-05T04:09:59.250+00:00",
    //     "$updatedAt": "2024-09-05T04:09:59.250+00:00",
    //     "$permissions": [],
    //     "$databaseId": "66c3489b0021873c518c",
    //     "$collectionId": "66d43b55002b13da9c91"
    // }
]

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLike: (state, action) => {
      const { likeData } = action.payload;
      const existingLike = state.find(
        (like) => likeData.postId === like.postId && likeData.userId === like.userId
      );
      if(!existingLike){
        state.push(likeData);
        // console.log("in likeslice pushed ",likeData);
        
      }
    },
    removeLike: (state, action) => {
      const {likeId, postId, userId } = action.payload;

      // Remove all likes matching postId and userId
      return state.filter(
        // (like) => like.$id!=likeId
        (like) => !(like.postId === postId && like.userId === userId)
      );
    },
    
    removeAllLikes: (state, action) => {
      return [];
    }
  }
})

export const { addLike, removeLike, removeAllLikes } = likeSlice.actions;
export default likeSlice.reducer;