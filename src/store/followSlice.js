import { createSlice } from "@reduxjs/toolkit";

const initialState =[
    // {
    //     "userId_follower": "66cf339e001688f1f46c",
    //     "userId_following": "66cd638d000ce14cdb70",
    //     "status": "active",
    //     "$id": "66e4177f0037aed0e5e2",
    //     "$createdAt": "2024-09-13T10:44:22.919+00:00",
    //     "$updatedAt": "2024-09-13T10:44:22.919+00:00",
    //     "$permissions": [],
    //     "$databaseId": "66c3489b0021873c518c",
    //     "$collectionId": "66c34a2e002c89dcb43e"
    // }
]

const followSlice=createSlice({
    name:'follow',
    initialState,
    reducers:{
        addFollow:(state,action)=>{
            const followerDetail = action.payload;
            console.log("Pritingfollowdetailsfromfollowslice",followerDetail);
            
            const details = state.find(ele=>ele.$id === followerDetail.$id)
            if(!details){
                state.push(followerDetail);
            }
        },
        removeFollow:(state,action)=>{
            const followId = action.payload;
            return state.filter(ele=>ele.$id!=followId);
        },

        clearFollow: (state,action)=>{
            return [];
        }

    }
})

export const {addFollow, removeFollow,clearFollow} =followSlice.actions;
export default followSlice.reducer;