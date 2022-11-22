import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authService from '../../service/auth-service';

export const register = createAsyncThunk(
    'auth/register',
    async (registerForm, { rejectWithValue }) => {
        try {
            const registerResponse = await authService.register(registerForm);
            return registerResponse.date;
        } catch (error) {
            return rejectWithValue(error.response.date);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: {},
        loading: false,
        error: false
    },
    reducers: {},
    extraReducers: {
        [register.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [register.fulfilled]: (state, payload) => {
            state.loading = false;
            state.error = false;
            state.userInfo = payload
        },
        [register.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const authActions = authSlice.actions;

export default authSlice;