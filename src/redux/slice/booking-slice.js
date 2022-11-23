import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        booking: {},
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers: {},
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice;