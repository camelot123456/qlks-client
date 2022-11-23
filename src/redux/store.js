import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/auth-slice';
import userJwtSlice from './slice/user-jwt-slice';
import roomtypeSlice from "./slice/roomtype-slice";

const store = configureStore({
    reducer: {
        userJwt: userJwtSlice.reducer,
        auth: authSlice.reducer,
        roomtype: roomtypeSlice.reducer
    }
});

export default store;