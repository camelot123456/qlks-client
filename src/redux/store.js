import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/auth-slice';
import userJwtSlice from './slice/user-jwt-slice';

const store = configureStore({
    reducer: {
        userJwt: userJwtSlice.reducer,
        auth: authSlice.reducer
    }
});

export default store;