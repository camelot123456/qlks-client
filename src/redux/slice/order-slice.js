import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as orderService from 'src/service/order-service';

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
            return orderResponse;
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

export const adminBillPayment = createAsyncThunk(
    'order/adminBillPayment',
    async (idOrder, { rejectWithValue }) => {
        try {
            const orderResponse = await orderService.adminBillPayment(idOrder);
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
            size: 20,
            sort: 'modified_at,desc',
            count: 0,
            pages: 0,
            search: ''
        },
        orders: [],
        order: {},
        loading: false,
        error: false,
        orderPaypal: {}
    },
    reducers: {
        onPageable: (state, {payload}) => {
            state.pageable = {
                ...state.pageable,
                page: payload.page,
                size: payload.size,
                sort: payload.sort,
                search: payload.search
            }
        },
    },
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
        [findAllByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.orders = action.payload.data;
            state.pageable = {
                ...state.pageable,
                count: action.payload.headers.count,
                page: action.payload.headers.page,
                pages: action.payload.headers.pages,
                size: action.payload.headers.size,
                sort: action.payload.headers.sort
            }
        },
        [findAllByUser.prototype]: (state, action) => {
            console.log(action);
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
        [adminBillPayment.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [adminBillPayment.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.orderPaypal = payload;
        },
        [adminBillPayment.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const {
    onPageable,
} = orderSlice.actions;

export default orderSlice;
