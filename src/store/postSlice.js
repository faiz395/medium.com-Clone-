import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        postId: '',
        postData: null,
        // sample data
        // postData:{
        //     "title": "WorkoutGuide",
        //     "featuredImage": "66bf3da8002496f519b9",
        //     "status": "active",
        //     "userId": "66ba42f5002de1e674a5",
        //     "content": "<h1><strong>default value</strong></h1>\n<p><strong>jksdjfd</strong></p>",
        //     "$id": "workout-guide",
        //     "$tenant": "181311",
        //     "$createdAt": "2024-08-16T11:53:18.123+00:00",
        //     "$updatedAt": "2024-08-16T14:31:10.218+00:00",
        //     "$permissions": [
        //         "read(\"user:66ba42f5002de1e674a5\")",
        //         "update(\"user:66ba42f5002de1e674a5\")",
        //         "delete(\"user:66ba42f5002de1e674a5\")"
        //     ],
        //     "$databaseId": "66b35d8300248b7263db",
        //     "$collectionId": "66b35da20035d781d195"
        // },
    }
]

const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        // use map in the beginning to add all posts using addPost with useEffect with a condition where post initialstate is empty
        addPost: (state, action) => {
            state.postId = action.payload.postId;
            state.postData = action.payload.postData;
        },  
        deletePost: (state, action) => ({
            ...state,
            postData:state.postData.filter(post=>post.postId!=action.payload.postId)
        }),
    }
})

export default postSlice.reducer;
export const { addPost, deletePost } = postSlice.actions;