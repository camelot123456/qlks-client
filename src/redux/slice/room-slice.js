import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as roomService from "../../service/room-service";

export const roomConsole = createAsyncThunk(
    'room/roomConsole',
    async (filterForm, { rejectWithValue }) => {
        try {
            const roomResponse = await roomService.roomsConsole(filterForm);
            return roomResponse;
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
            sort: 'modified_at,desc',
            count: 0,
            pages: 0,
            search: ''
        },
        loading: false,
        error: false,
        roomsConsole: [],
        roomsToAdd: [],
        rooms: [],
        room: {}
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
        [roomConsole.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [roomConsole.fulfilled]: (state, action) => {
            console.log(action);
            state.loading = false;
            state.error = false;
            state.roomsConsole = action.payload.data;
            state.pageable = {
                ...state.pageable,
                count: action.payload.headers.count,
                page: action.payload.headers.page,
                pages: action.payload.headers.pages,
                size: action.payload.headers.size,
                sort: action.payload.headers.sort
            }
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

export const {
    onPageable
} = roomSlice.actions;

export default roomSlice;
