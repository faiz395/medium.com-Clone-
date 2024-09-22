import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    // {
    //     "userId": "66cf433a002468b6e9e6",
    //     "featuredImage": "66ec39ee00208c7962af",
    //     "bio": "Hello World! I am a react expert!",
    //     "pronoun": "He",
    //     "userName": "Faiz Ansari",
    //     "status": "active",
    //     "$id": "66edaba20000b54f03ab",
    //     "$createdAt": "2024-09-20T17:06:45.492+00:00",
    //     "$updatedAt": "2024-09-20T17:07:12.542+00:00",
    //     "$permissions": [],
    //     "$databaseId": "66c3489b0021873c518c",
    //     "$collectionId": "66ed8de1001422c083f2"
    // }
];

const userProfileSlice = createSlice({
    name:'userProfile',
    initialState,
    reducers:{
        addProfile:(state,action)=>{
            console.log("fromprofilesliceaddedinprofileslice");
            const existingValues=state.find(ele=>ele.userId==action.payload.userId)
            if(!existingValues){
                state.push(action.payload)
            }
            
        },
        updateProfile:(state,action)=>{
            console.log("fromprofilesliceupdatedinprofileslice");
            const valueToUpdate=  action.payload;
            return state.map(ele=>ele.$id!=action.payload.$id?ele:{...valueToUpdate})
        },
        deleteProfile:(state,action)=>{
            //pass the id of userProfile to be deleted
            return state.filter(ele=>ele.$id!=action.payload);
        },
        clearProfile:(state,action)=>{
            return [];
        }
    }
})

export const {addProfile,updateProfile,deleteProfile,clearProfile} = userProfileSlice.actions;
export default userProfileSlice.reducer;