import { createSlice } from "@reduxjs/toolkit";

const addRoomtypeBooking = (roomTypeBookings, id, name, quantity) => {
    if (!roomTypeBookings.length) {
        roomTypeBookings.push({ id, quantity, name });
        return roomTypeBookings;
    }
    roomTypeBookings.forEach((item, index) => {
        if (item.id === id) {
            item = {
                ...item,
                quantity
            };
            roomTypeBookings.splice(index, 1, item);
            return roomTypeBookings;
        } else {
            if (roomTypeBookings.every(iter => iter.id !== id)) {
                roomTypeBookings.push({ id, quantity, name });
                return roomTypeBookings;
            }
        }
    });
    return roomTypeBookings;
};

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
            state.bookingRequest.roomTypeBookings = addRoomtypeBooking(
                state.bookingRequest.roomTypeBookings,
                payload.id,
                payload.name,
                payload.quantity,
            );
        }
    },
    extraReducers: {},
});

export const { updateTimeBooking, addOrUpdateRoomtype } = bookingSlice.actions;
export default bookingSlice;