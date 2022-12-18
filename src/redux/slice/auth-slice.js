import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "constants/constants";
import * as authService from 'service/auth-service';

export const register = createAsyncThunk(
    'auth/register',
    async (registerForm, { rejectWithValue }) => {
        try {
            const registerResponse = await authService.register(registerForm);
            return registerResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAccountMe = createAsyncThunk(
    'auth/getAccountMe',
    async (params, { rejectWithValue }) => {
        try {
            const registerResponse = await authService.accountMe();
            return registerResponse.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: {},
        isLogin: false,
        loading: false,
        error: false,
        accountMe: {
            address: '',
            avatar: null,
            birthday: '',
            country: '',
            createdAt: '',
            createdBy: '',
            email: '',
            firstName: '',
            gender: null,
            id: null,
            idObject: '',
            langKey: '',
            lastName: '',
            modifiedAt: '', 
            modifiedBy: '',
            phoneNumber: '',
            resetAt: null,
            username: '',
        }
    },
    reducers: {
        logout: (state, payload) => {
            handleLogout();
            state.accountMe = {};
            state.loading = false;
            state.error = false;
            state.isLogin = false;
            state.userInfo = {};
        }
    },
    extraReducers: {
        [register.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [register.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.userInfo = payload;
        },
        [register.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getAccountMe.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getAccountMe.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.accountMe = payload;
            state.isLogin = true;
        },
        [getAccountMe.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
            state.isLogin = false;
        },
    }
});

export const { logout } = authSlice.actions;

export default authSlice;