import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/auth-slice';
import userJwtSlice from './slice/user-jwt-slice';
import roomtypeSlice from "./slice/roomtype-slice";
import serviceSlice from './slice/service-slice';
import bookingSlice from './slice/booking-slice';
import discountSlice from './slice/discount-slice';
import paymentSice from "./slice/payment-slice";
import orderSlice from './slice/order-slice';
import roomSlice from './slice/room-slice';

const store = configureStore({
    reducer: {
        userJwt: userJwtSlice.reducer,
        auth: authSlice.reducer,
        roomtype: roomtypeSlice.reducer,
        service: serviceSlice.reducer,
        booking: bookingSlice.reducer,
        discount: discountSlice.reducer,
        payment: paymentSice.reducer,
        order: orderSlice.reducer,
        room: roomSlice.reducer,
    }
});

export default store;
