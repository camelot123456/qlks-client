import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as roomService from "../../service/room-service";

export const roomSchedule = createAsyncThunk(
    'room/roomSchedule',
    async (filterForm, { rejectWithValue }) => {
        try {
            const roomResponse = await roomService.roomsSchedule(filterForm);
            return roomResponse;
        } catch (error) {
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const findAll = createAsyncThunk(
    'room/findAll',
    async (pageable, { rejectWithValue }) => {
        try {
            const roomResponse = await roomService.findAll(pageable);
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
        pageableSchedule: {
            page: 0,
            size: 20,
            sort: 'idRoom,desc',
            count: 0,
            pages: 0,
            search: '',
            roomName: '',
            idRoomType: '',
            floor: '',
            minGuest: 0,
            maxGuest: 100,
            from: new Date().toISOString().substr(0, 10),
            to: new Date().toISOString().substr(0, 10),
            states: ''
        },
        loading: false,
        error: false,
        roomsSchedule: [],
        roomsToAdd: [],
        rooms: [],
        room: {}
    },
    reducers: {
        handlePageable: (state, {payload}) => {
            state.pageableSchedule = {
                ...state.pageableSchedule,
                page: payload.page,
                size: payload.size,
                sort: payload.sort,
                search: payload.search
            }
        },
        handleScheduleFilter: (state, {payload}) => {
            state.pageableSchedule = {
                ...state.pageableSchedule,
                roomName: payload.roomName,
                idRoomType: payload.idRoomType,
                floor: payload.floor,
                minGuest: payload.minGuest,
                maxGuest: payload.maxGuest,
                from: payload.from,
                to: payload.to,
                states: payload.states
            }
        },
    },
    extraReducers: {
        [findAll.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [findAll.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.rooms = action.payload.data;
            state.pageableSchedule = {
                ...state.pageableSchedule,
                count: action.payload.headers.count,
                page: action.payload.headers.page,
                pages: action.payload.headers.pages,
                size: action.payload.headers.size,
                sort: action.payload.headers.sort,
                search: action.payload.headers.search
            }
        },
        [findAll.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [roomSchedule.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [roomSchedule.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.roomsSchedule = action.payload.data;
            state.pageableSchedule = {
                ...state.pageableSchedule,
                count: action.payload.headers.count,
                page: action.payload.headers.page,
                pages: action.payload.headers.pages,
                size: action.payload.headers.size,
                sort: action.payload.headers.sort,
                search: action.payload.headers.search
            }
        },
        [roomSchedule.rejected]: (state, payload) => {
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
    handlePageable,
    handleScheduleFilter
} = roomSlice.actions;

export default roomSlice;
