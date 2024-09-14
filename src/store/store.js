import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postSlice from './postSlice';
import likeSlice from './likeSlice';
import { comment } from 'postcss';
import commentSlice from './commentSlice';
import followSlice from './followSlice';

const store = configureStore({
    reducer:{
        auth:authSlice,
        post:postSlice,
        like:likeSlice,
        comment:commentSlice,
        follow:followSlice,
    }
})

export default store;