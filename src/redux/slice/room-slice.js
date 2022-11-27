import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as roomService from "../../service/room-service";

export const roomConsole = createAsyncThunk(
    'room/roomConsole',
    async (filterForm, { rejectWithValue }) => {
        try {
            console.log(filterForm);
            const roomResponse = await roomService.roomsConsole(filterForm);
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
            console.log(payload);
            state.loading = false;
            state.error = false;
            state.roomsConsole = payload;
        },
        [roomConsole.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const roomActions = roomSlice.actions;

export default roomSlice;