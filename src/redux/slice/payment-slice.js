import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as paymentService from 'service/payment-service';

export const createOrderPaypal = createAsyncThunk(
    'payment/createOrder',
    async (idBooking, {rejectedWithValue}) => {
        try {
            const paymentResponse = await paymentService.createOrderPaypal(idBooking);
            return paymentResponse.data;
        } catch (e) {
            return rejectedWithValue(e.getMessage);
        }
    }
);

export const captureOrderPaypal = createAsyncThunk(
    'payment/captureOrder',
    async (idOrderPaypal, {rejectedWithValue}) => {
        try {
            const paymentResponse = await paymentService.captureOrderPaypal(idOrderPaypal);
            return paymentResponse.data;
        } catch (e) {
            return rejectedWithValue(e.getMessage);
        }
    }
);

export const captureOrderPaypalByUUID = createAsyncThunk(
    'payment/captureOrderByUUID',
    async (uuidOrderPaypal, {rejectedWithValue}) => {
        try {
            const paymentResponse = await paymentService.captureOrderPaypalByUUID(uuidOrderPaypal);
            return paymentResponse.data;
        } catch (e) {
            return rejectedWithValue(e.getMessage);
        }
    }
);

export const findOrderDetailPaypal = createAsyncThunk(
    'payment/findOrderDetail',
    async (idOrderPaypal, {rejectedWithValue}) => {
        try {
            const paymentResponse = await paymentService.findOrderDetailPaypal(idOrderPaypal);
            return paymentResponse.data;
        } catch (e) {
            return rejectedWithValue(e.getMessage);
        }
    }
);

const paymentSice = createSlice({
    name: 'payment',
    initialState: {
        loading: false,
        error: false,
        bookingInfo: {},
        paymentInfo: {},
        captureInfo: {}
    },
    reducers: {},
    extraReducers: {
        [createOrderPaypal.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [createOrderPaypal.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.bookingInfo = payload;
        },
        [createOrderPaypal.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [findOrderDetailPaypal.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [findOrderDetailPaypal.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.paymentInfo = payload;
        },
        [findOrderDetailPaypal.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [captureOrderPaypal.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [captureOrderPaypal.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.captureInfo = payload;
        },
        [captureOrderPaypal.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [captureOrderPaypalByUUID.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [captureOrderPaypalByUUID.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const {  } = paymentSice.actions;

export default paymentSice;
