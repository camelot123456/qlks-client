import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as serviceService from '../../service/service-service';

export const findAll = createAsyncThunk(
    'service/findAll',
    async (pageable, { rejectedWithValue }) => {
        try {
            const serviceResponse = await serviceService.findAll(pageable);
            return serviceResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const findById = createAsyncThunk(
    'service/findById',
    async (id, { rejectedWithValue }) => {
        try {
            const serviceResponse = await serviceService.findById(id);
            return serviceResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: [],
        service: {},
        loading: false,
        error: false
    },
    reducers: {

    },
    extraReducers: {
        [findAll.pending]: (state, acction) => {
            state.loading = true;
            state.error = false;
        },
        [findAll.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.services = payload;
        },
        [findAll.rejected]: (state, acction) => {
            state.loading = false;
            state.error = true;
        },
        [findById.pending]: (state, acction) => {
            state.loading = true;
            state.error = false;
        },
        [findById.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.service = payload;
        },
        [findById.rejected]: (state, acction) => {
            state.loading = false;
            state.error = true;
        }
    }
});

export const serviceAction = serviceSlice.actions;

export default serviceSlice;