import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as orderService from '../../service/order-service';

export const findAll = createAsyncThunk(
    'order/findAll',
    async (pageable, { rejectWithValue }) => {
        try {
            const orderResponse = await orderService.findAll(pageable);
            return orderResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const findAllByUser = createAsyncThunk(
    'order/findAllByUser',
    async (pageable, { rejectWithValue }) => {
        try {
            const orderResponse = await orderService.findAllByUser(pageable);
            return orderResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const findById = createAsyncThunk(
    'order/findById',
    async (id, { rejectWithValue }) => {
        try {
            const orderResponse = await orderService.findById(id);
            return orderResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const billPayment = createAsyncThunk(
    'order/billPayment',
    async (idOrderPaypal, { rejectWithValue }) => {
        try {
            const orderResponse = await orderService.billPayment(idOrderPaypal);
            return orderResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        pageable: {
            page: 0,
            size: 0,
            sort: 'id,asc',
            count: 0,
            pages: 0
        },
        orders: [],
        order: {},
        loading: false,
        error: false,
        orderPaypal: {}
    },
    reducers: {},
    extraReducers: {
        [findAll.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [findAll.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.orders = payload;
        },
        [findAll.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [findById.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [findById.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.order = payload;
        },
        [findById.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [findAllByUser.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [findAllByUser.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.orders = payload;
        },
        [findAllByUser.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [billPayment.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [billPayment.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.orderPaypal = payload;
        },
        [billPayment.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const orderActions = orderSlice.actions;

export default orderSlice;