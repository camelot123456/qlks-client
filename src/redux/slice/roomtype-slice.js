import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ROOMTYPE_CART } from "src/constants/constants";
import * as roomtypeService from 'src/service/roomtype-service';

export const roomtypeFilter = createAsyncThunk(
    'roomtype/search',
    async (filterForm, { rejectedWithValue }) => {
        try {
            const roomtypes = await roomtypeService.roomTypeSearch(filterForm);
            return roomtypes.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);

export const findAllObjectSelect = createAsyncThunk(
    'roomtype/select',
    async (params, { rejectedWithValue }) => {
        try {
            const roomtypeSelect = await roomtypeService.findObjectSelect();
            return roomtypeSelect.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);

export const findAll = createAsyncThunk(
    'roomtype/findAll',
    async (pageable, { rejectedWithValue }) => {
        try {
            const roomtype = await roomtypeService.findAll(pageable);
            return roomtype.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);

export const findById = createAsyncThunk(
    'roomtype/findById',
    async (id, { rejectedWithValue }) => {
        try {
            const roomtype = await roomtypeService.findById(id);
            return roomtype.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);

export const addRoomIntoCart = (idRoomtype) => {
    try {
        if (!localStorage.getItem(ROOMTYPE_CART)) {
            const initCart = [];
            initCart.push({ idRoomtype, quantity: 1 });
            localStorage.setItem(ROOMTYPE_CART, JSON.stringify(initCart));
            return true;
        }
        let roomtypeCarts = JSON.parse(localStorage.getItem(ROOMTYPE_CART));
        roomtypeCarts.forEach((item, index) => {
            if (item.idRoomtype === idRoomtype) {
                item = {
                    ...item,
                    quantity: item.quantity + 1
                };
                roomtypeCarts.splice(index, 1, item);
                localStorage.setItem(ROOMTYPE_CART, JSON.stringify(roomtypeCarts));
                return true;
            } else {
                if (roomtypeCarts.every(iter => iter.idRoomtype !== idRoomtype)) {
                    roomtypeCarts.push({ idRoomtype, quantity: 1 });
                    localStorage.setItem(ROOMTYPE_CART, JSON.stringify(roomtypeCarts));
                    return true;
                }
            }
        });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const saveRoomtypeTemporary = (roomTypeBookings, id, name, quantity, countRoom, price) => {
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

const roomtypeSlice = createSlice({
    name: 'roomtype',
    initialState: {
        roomtypeBookings: [],
        roomtypeSelect: [],
        roomtypeSearch: [],
        roomtypeCart: [],
        roomtypes: [],
        roomtype: {},
        loading: false,
        error: false,
    },
    reducers: {
        addRoomIntoCart: (state, payload) => {
            state.roomtypeCart = payload;
        },
        saveRoomtypeTemp: (state, { payload }) => {
            state.roomtypeBookings = saveRoomtypeTemporary(
                state.roomtypeBookings,
                payload.id,
                payload.name,
                payload.quantity,
                payload.countRoom,
                payload.price
            )
        },
        resetState: (state) => {
            state.roomtypeBookings = [];
            state.roomtypeSelect = [];
            state.roomtypeSearch = [];
            state.roomtypeCart = [];
            state.roomtypes = [];
            state.roomtype = {};
        },
    },
    extraReducers: {
        [roomtypeFilter.pending]: (state, acction) => {
            state.loading = true;
            state.error = false;
        },
        [roomtypeFilter.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.roomtypeSearch = [];
            state.roomtypeSearch = payload;
        },
        [roomtypeFilter.rejected]: (state, acction) => {
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
            state.roomtype = payload;
        },
        [findById.rejected]: (state, acction) => {
            state.loading = false;
            state.error = true;
        },
        [findAll.pending]: (state, acction) => {
            state.loading = true;
            state.error = false;
        },
        [findAll.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.roomtypes = payload;
        },
        [findAll.rejected]: (state, acction) => {
            state.loading = false;
            state.error = true;
        },
        [findAllObjectSelect.pending]: (state, acction) => {
            state.loading = true;
            state.error = false;
        },
        [findAllObjectSelect.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.roomtypeSelect = payload;
        },
        [findAllObjectSelect.rejected]: (state, acction) => {
            state.loading = false;
            state.error = true;
        }
    }
});

export const {
    saveRoomtypeTemp,
    resetState
} = roomtypeSlice.actions;

export default roomtypeSlice;
