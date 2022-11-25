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

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
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
    },
});

export const { 
    updateTimeBooking, 
    addOrUpdateRoomtype, 
    addOrUpdateService,
    addOrUpdateDiscount } = bookingSlice.actions;
export default bookingSlice;