import {createSlice, createReducer, createAsyncThunk} from "@reduxjs/toolkit";
import * as roomtypeService from '../../service/roomtype-service';

export const roomtypeFilter = createAsyncThunk(
    'roomtype/search',
    async (filterForm, { rejectedWithValue }) => {
        try {
            const roomtypes = await roomtypeService.roomTypeSearch(filterForm);
            return roomtypes.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);

const roomtypeSlice = createSlice({
    name: 'roomtype',
    initialState: {
        roomtypeSearch: [],
        roomtypes: [],
        loading: false,
        error: false,
    },
    reducers: {

    },
    extraReducers: {
        [roomtypeFilter.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [roomtypeFilter.fulfilled]: (state, payload) => {
            state.loading = false;
            state.error = false;
            state.roomtypeSearch = payload;
        },
        [roomtypeFilter.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        }
    }
});

export const roomtypeAction = roomtypeSlice.actions;

export default roomtypeSlice;