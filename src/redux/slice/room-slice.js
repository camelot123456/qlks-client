import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as roomService from "../../service/room-service";

export const roomConsole = createAsyncThunk(
    'room/roomConsole',
    async (filterForm, { rejectWithValue }) => {
        try {
            const roomResponse = await roomService.roomsConsole(filterForm);
            return roomResponse.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const findAllRoomsToAddByIdBooking = createAsyncThunk(
    'room/findAllRoomsToAddByIdBooking',
    async (idBooking, { rejectWithValue }) => {
        try {
            const roomResponse = await roomService.findAllRoomsToAddByIdBooking(idBooking);
            return roomResponse.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

const roomSlice = createSlice({
    name: 'room',
    initialState: {
        pageable: {
            page: 0,
            size: 0,
            sort: 'id,asc',
            count: 0,
            pages: 0
        },
        loading: false,
        error: false,
        roomsConsole: [],
        roomsToAdd: [],
        rooms: [],
        room: {}
    },
    reducers: {},
    extraReducers: {
        [roomConsole.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [roomConsole.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.roomsConsole = payload;
        },
        [roomConsole.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [findAllRoomsToAddByIdBooking.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [findAllRoomsToAddByIdBooking.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.roomsToAdd = payload;
        },
        [findAllRoomsToAddByIdBooking.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const roomActions = roomSlice.actions;

export default roomSlice;