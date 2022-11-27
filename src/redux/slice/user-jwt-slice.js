import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "../../constants/constants";
import * as authService from '../../service/auth-service';
import * as userJwtService from '../../service/user-jwt-service';

export const login = createAsyncThunk(
    'userJwt/login',
    async (loginFrom, { rejectWithValue }) => {
        try {
            const jwtToken = await userJwtService.getAccessToken(loginFrom);
            localStorage.setItem(ACCESS_TOKEN, jwtToken.data.access_token);
            return jwtToken.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userJwtSlice = createSlice({
    name: 'userJwt',
    initialState: {
        jwtToken: {},
        error: false,
        loading: false,
    },
    reducers: {
    },
    extraReducers: {
        [login.pending]: (state, { payload }) => {
            state.loading = true;
            state.error = false;
        },
        [login.fulfilled]: (state, payload) => {
            state.loading = false;
            state.error = false;
            state.jwtToken = payload;
        },
        [login.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = true;
        }
    }
});

export const userJwtActions = userJwtSlice.actions;

export default userJwtSlice;

