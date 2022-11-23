import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/auth-slice';
import userJwtSlice from './slice/user-jwt-slice';
import roomtypeSlice from "./slice/roomtype-slice";
import serviceSlice from './slice/service-slice';
import bookingSlice from './slice/booking-slice';

const store = configureStore({
    reducer: {
        userJwt: userJwtSlice.reducer,
        auth: authSlice.reducer,
        roomtype: roomtypeSlice.reducer,
        service: serviceSlice.reducer,
        booking: bookingSlice.reducer
    }
});

export default store;