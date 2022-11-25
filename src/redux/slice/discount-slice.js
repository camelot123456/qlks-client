import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as discountService from "../../service/discount-service";

export const findByGiftCode = createAsyncThunk(
    '/disount/findByGiftCode',
    async (giftCode, { rejectedWithValue }) => {
        try {
            const discountResponse = await discountService.findByGiftCode(giftCode);
            return discountResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const isExpireByGiftCode = createAsyncThunk(
    '/disount/expire',
    async (giftCode, { rejectedWithValue }) => {
        try {
            const discountResponse = await discountService.isExpireByGiftCode(giftCode);
            return discountResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

const discountSlice = createSlice({
    name: 'discount',
    initialState: {
        discountBookings: [],
        discount: {},
        discounts: [],
        loading: false,
        error: false,
        isExpireGiftCode: false,
    },
    reducers: {
    },
    extraReducers: {
        [findByGiftCode.pending]: (state, { payload }) => {
            state.loading = true;
            state.error = false;
        },
        [findByGiftCode.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.discount = payload;
        },
        [findByGiftCode.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = true;
        },
        [isExpireByGiftCode.pending]: (state, { payload }) => {
            state.loading = true;
            state.error = false;
        },
        [isExpireByGiftCode.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.isExpireGiftCode = payload;
        },
        [isExpireByGiftCode.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = true;
            state.isExpireGiftCode = payload;
        },
    }
});

export const {} = discountSlice.actions;

export default discountSlice;