import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as bookingService from 'src/service/booking-service';

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

export const findAll = createAsyncThunk(
    '/booking/findAll',
    async (pageable, { rejectedWithValue }) => {
        try {
            const bookingResponse = await bookingService.findAll(pageable);
            return bookingResponse;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

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

export const getTemporaryBooking = createAsyncThunk(
    '/booking/getTemporaryBooking',
    async (idBooking, { rejectedWithValue }) => {
        try {
            const bookingResponse = await bookingService.getTemporaryBooking(idBooking);
            return bookingResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const deleteById = createAsyncThunk(
    '/booking/deleteById',
    async (idBooking, { rejectedWithValue }) => {
        try {
            const bookingResponse = await bookingService.deleteById(idBooking);
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

export const updateBookingRequest = createAsyncThunk(
    '/booking/update',
    async (bookingForm, { rejectedWithValue }) => {
        try {
            const bookingResponse = await bookingService.updateBookingRequest(bookingForm);
            return bookingResponse.data;
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const createAdminBookingRequest = createAsyncThunk(
    '/booking/adminCreate',
    async (bookingForm, { rejectedWithValue }) => {
        try {
            const bookingResponse = await bookingService.createAdminBookingRequest(bookingForm);
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

export const checkinBooking = createAsyncThunk(
    '/booking/checkinBooking',
    async (idBooking, { rejectedWithValue }) => {
        try {
            return await bookingService.checkinBooking(idBooking);
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const checkoutBooking = createAsyncThunk(
    '/booking/checkoutBooking',
    async (idBooking, { rejectedWithValue }) => {
        try {
            return await bookingService.checkoutBooking(idBooking);
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const cleanRoomBooking = createAsyncThunk(
    '/booking/cleanRoomBooking',
    async (idBooking, { rejectedWithValue }) => {
        try {
            return await bookingService.cleanRoomBooking(idBooking);
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const cleanFinishBooking = createAsyncThunk(
    '/booking/cleanFinishBooking',
    async (idBooking, { rejectedWithValue }) => {
        try {
            return await bookingService.cleanFinishBooking(idBooking);
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

export const changeRoomBooking = createAsyncThunk(
    '/booking/changeRoomBooking',
    async (bookingForm, { rejectedWithValue }) => {
        try {
            return await bookingService.changeRoomBooking(bookingForm);
        } catch (error) {
            return rejectedWithValue(error);
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        pageable: {
            page: 0,
            pages: 0,
            sort: 'modifiedAt,desc',
            search: '',
            count: 0,
            size: 20
        },
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
        temporaryBooking: {
            roomCharge: 0,
            serviceCharge: 0,
            surchargeTotal: 0,
            grandTotal: 0,
            debitTotal: 0,
            checkIn: '',
            checkOut: '',
            adultGuest: 0,
            childGuest: 0
        },
        roomsToAddRequest: {
            id: null,
            roomBookings: []
        },
        bookings: [],
        bookingInfo: {},
        loading: false,
        error: false
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
        },
        initBookingInfoEdit: (state, { payload }) => {
            state.bookingRequest.roomTypeBookings = payload.roomTypeBookings;
            state.bookingRequest.serviceBookings = payload.serviceBookings;
            state.bookingRequest.discountBookings = payload.discountBookings;
        },
        resetState: (state) => {
            state.bookingNotSetRooms = [];
            state.booking = {};
            state.idTemp = null;
            state.bookingRequest = {
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
            };
            state.temporaryBooking = {
                roomCharge: 0,
                serviceCharge: 0,
                surchargeTotal: 0,
                grandTotal: 0,
                debitTotal: 0,
                checkIn: '',
                checkOut: '',
                adultGuest: 0,
                childGuest: 0
            };
            state.roomsToAddRequest = {
                id: null,
                roomBookings: []
            };
            state.bookings = [];
            state.bookingInfo = {};
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
        [updateBookingRequest.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [updateBookingRequest.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.booking = payload;
        },
        [updateBookingRequest.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [createAdminBookingRequest.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [createAdminBookingRequest.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.booking = payload;
        },
        [createAdminBookingRequest.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [findAll.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [findAll.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.bookings = action.payload.data;
            state.pageable = {
                ...state.pageable,
                count: action.payload.headers.count,
                page: action.payload.headers.page,
                pages: action.payload.headers.pages,
                size: action.payload.headers.size,
                sort: action.payload.headers.sort
            }
        },
        [findAll.rejected]: (state, {payload}) => {
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
        [getTemporaryBooking.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [getTemporaryBooking.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.temporaryBooking = payload;
        },
        [getTemporaryBooking.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [deleteById.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [deleteById.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
        },
        [deleteById.rejected]: (state, {payload}) => {
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
        [changeRoomBooking.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [changeRoomBooking.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
        },
        [changeRoomBooking.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [checkinBooking.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [checkinBooking.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
        },
        [checkinBooking.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [checkoutBooking.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [checkoutBooking.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
        },
        [checkoutBooking.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [cleanRoomBooking.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [cleanRoomBooking.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
        },
        [cleanRoomBooking.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
        [cleanFinishBooking.pending]: (state, {payload}) => {
            state.loading = true;
            state.error = false;
        },
        [cleanFinishBooking.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
        },
        [cleanFinishBooking.rejected]: (state, {payload}) => {
            state.loading = false;
            state.error = true;
        },
    },
});

export const { 
    onPageable,
    updateTimeBooking, 
    addOrUpdateRoomtype, 
    addOrUpdateService,
    addOrUpdateDiscount,
    addRoomsIntoBookingRequest,
    addIdBookingIntoBookingRequest,
    initBookingInfoEdit,
    resetState
} = bookingSlice.actions;
export default bookingSlice;
