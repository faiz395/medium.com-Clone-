import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData: null,
    // userData:
    // {
    //     "$id": "66cd638d000ce14cdb70",
    //     "$createdAt": "2024-08-27T05:26:39.456+00:00",
    //     "$updatedAt": "2024-09-15T17:55:15.509+00:00",
    //     "name": "Faiz A",
    //     "registration": "2024-08-27T05:26:39.437+00:00",
    //     "status": true,
    //     "labels": [],
    //     "passwordUpdate": "2024-08-27T05:26:39.437+00:00",
    //     "email": "abc@gmail.com",
    //     "phone": "",
    //     "emailVerification": false,
    //     "phoneVerification": false,
    //     "mfa": false,
    //     "prefs": {
    //         "pronoun": "Him",
    //         "bio": "Hello this is a short bio!"
    //     },
    //     "targets": [
    //         {
    //             "$id": "66cd638f87b0a1e91347",
    //             "$createdAt": "2024-08-27T05:26:39.555+00:00",
    //             "$updatedAt": "2024-08-27T05:26:39.555+00:00",
    //             "name": "",
    //             "userId": "66cd638d000ce14cdb70",
    //             "providerId": null,
    //             "providerType": "email",
    //             "identifier": "abc@gmail.com"
    //         }
    //     ],
    //     "accessedAt": "2024-09-15T10:25:15.915+00:00"
    // }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        // directly pass object of userData
        login:(state, action)=>{
            // console.log("priting userData ",state);
            
            state.status=true;
            state.userData=action.payload;
        }, 
        logout:(state,action)=>{
            state.status=false;
            state.userData=null;
        }
    }
})

export const {login, logout} =authSlice.actions;
export default authSlice.reducer;

