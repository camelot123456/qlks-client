import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as serviceService from 'src/service/service-service';

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

const saveServiceTemporary = (serviceBookings, id, name, quantity, price) => {
    if (!serviceBookings.length) {
        serviceBookings.push({ id, quantity, name, price });
        return serviceBookings;
    }
    serviceBookings.forEach((item, index) => {
        if (item.id === id) {
            if (!quantity) {
                serviceBookings.splice(index, 1);
                return serviceBookings;
            };
            item = {
                ...item,
                quantity
            };
            serviceBookings.splice(index, 1, item);
            return serviceBookings;
        } else {
            if (serviceBookings.every(iter => iter.id !== id)) {
                serviceBookings.push({ id, quantity, name, price });
                return serviceBookings;
            }
        }
    });
    return serviceBookings;
};

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        serviceBookings: [],
        services: [],
        service: {},
        loading: false,
        error: false
    },
    reducers: {
        saveServiceTemp: (state, { payload }) => {
            state.serviceBookings = saveServiceTemporary(
                state.serviceBookings,
                payload.id,
                payload.name,
                payload.quantity,
                payload.price
            )
        }
    },
    extraReducers: {
        [findAll.pending]: (state, acction) => {
            state.loading = true;
            state.error = false;
        },
        [findAll.fulfilled]: (state, { payload }) => {
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
        [findById.fulfilled]: (state, { payload }) => {
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

export const { saveServiceTemp } = serviceSlice.actions;

export default serviceSlice;
