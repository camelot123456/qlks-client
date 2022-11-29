import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as bookingService from '../../service/booking-service';

const addRoomtypeBooking = (roomTypeBookings, id, name, quantity, countRoom, price) => {
    if (!roomTypeBookings.length) {
        roomTypeBookings.push({ id, quantity, name, countRoom, price });
        return roomTypeBookings;
    }
    roomTypeBookings.forEach((item, index) => {
        if (item.id === id) {
            if (!quantity) {
                roomTypeBookings.splice(index, 1);
                return roomTypeBookings;
            };
            item = {
                ...item,
                quantity
            };
            roomTypeBookings.splice(index, 1, item);
            return roomTypeBookings;
        } else {
            if (roomTypeBookings.every(iter => iter.id !== id)) {
                roomTypeBookings.push({ id, quantity, name, countRoom, price });
                return roomTypeBookings;
            }
        }
    });
    return roomTypeBookings;
};

const addDiscountBooking = (discountBookings, isExpireGiftCode, giftCode, name, percent, description) => {
    if (!isExpireGiftCode) {
        return discountBookings;
    }
    if (!discountBookings.length) {
        discountBookings.push({ giftCode, name, percent, description });
        return discountBookings;
    }
    if (discountBookings.every(iter => iter.giftCode !== giftCode)) {
        discountBookings.push({ giftCode, name, percent, description });
        return discountBookings;
    }
    return discountBookings;
};

export const findById = createAsyncThunk(
    '/booking/findById',
    async (idBooking, { rejectedWithValue }) => {
        try {
            const bookingResponse = await bookingService.findById(idBooking);
            return bookingResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const createBookingRequest = createAsyncThunk(
    '/booking/create',
    async (bookingForm, { rejectedWithValue }) => {
        try {
            const bookingResponse = await bookingService.createBookingRequest(bookingForm);
            return bookingResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const findAllNotSetTheRooms = createAsyncThunk(
    '/booking/findAllNotSetTheRooms',
    async (params, { rejectedWithValue }) => {
        try {
            const bookingResponse = await bookingService.findAllNotSetTheRooms();
            return bookingResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const addRoomsIntoBooking = createAsyncThunk(
    '/booking/addRoomsIntoBooking',
    async (bookingForm, { rejectedWithValue }) => {
        try {
            const bookingResponse = await bookingService.addRoomsIntoBooking(bookingForm);
            return bookingResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        bookingNotSetRooms: [],
        booking: {},
        idTemp: null,
        bookingRequest: {
            checkin: '',
            checkout: '',
            adultGuest: '',
            childGuest: '',
            note: '',
            fullname: '',
            email: '',
            phoneNumber: '',
            country: '',
            discountBookings: [],
            roomBooking: [],
            roomTypeBookings: [],
            serviceBookings: [],
        },
        roomsToAddRequest: {
            id: null,
            roomBookings: []
        },
        bookingInfo: {},
        loading: false,
        error: false
    },
    reducers: {
        updateTimeBooking: (state, { payload }) => {
            state.idTemp = new Date().getTime();
            state.bookingRequest = {
                ...state.bookingRequest,
                checkin: payload.checkin,
                checkout: payload.checkout,
                adultGuest: payload.adultGuest,
                childGuest: payload.childGuest,
            };
        },
        addOrUpdateRoomtype: (state, { payload }) => {
            state.bookingRequest.roomTypeBookings = payload.roomTypeBookings;
        },
        addOrUpdateService: (state, {payload}) => {
            state.bookingRequest.serviceBookings = payload.serviceBookings;
        },
        addOrUpdateDiscount: (state, {payload}) => {
            state.bookingRequest.discountBookings = addDiscountBooking(
                state.bookingRequest.discountBookings,
                payload.isExpireGiftCode,
                payload.giftCode,
                payload.name,
                payload.percent,
                payload.description
            );
        },
        addRoomsIntoBookingRequest: (state, {payload}) => {
            state.roomsToAddRequest.roomBookings = payload;
        },
        addIdBookingIntoBookingRequest: (state, {payload}) => {
            state.roomsToAddRequest.id = payload;
        }
    },
    extraReducers: {
        [createBookingRequest.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [createBookingRequest.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.booking = payload;
        },
        [createBookingRequest.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [findById.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [findById.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.bookingInfo = payload;
        },
        [findById.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [findAllNotSetTheRooms.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [findAllNotSetTheRooms.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.bookingNotSetRooms = payload;
        },
        [findAllNotSetTheRooms.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [addRoomsIntoBooking.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [addRoomsIntoBooking.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
        },
        [addRoomsIntoBooking.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
    },
});

export const { 
    updateTimeBooking, 
    addOrUpdateRoomtype, 
    addOrUpdateService,
    addOrUpdateDiscount,
    addRoomsIntoBookingRequest,
    addIdBookingIntoBookingRequest
} = bookingSlice.actions;
export default bookingSlice;
