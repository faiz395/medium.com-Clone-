import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData: null,
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