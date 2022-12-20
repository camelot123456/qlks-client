import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as feedbackService from 'service/feedback-service';

export const findAll = createAsyncThunk(
    'feedback/findAll',
    async (pageable, { rejectedWithValue }) => {
        try {
            const feedback = await feedbackService.findAll(pageable);
            return feedback;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);

export const findById = createAsyncThunk(
    'feedback/findById',
    async (id, { rejectedWithValue }) => {
        try {
            const feedback = await feedbackService.findById(id);
            return feedback.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);

export const update = createAsyncThunk(
    'feedback/update',
    async (feedbackForm, { rejectedWithValue }) => {
        try {
            const feedback = await feedbackService.update(feedbackForm);
            return feedback.data;
        } catch (error) {
            return rejectedWithValue(error.response.data);
        }
    }
);

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        feedback: {},
        feedbacks: [],
        pageable: {
            page: 0,
            pages: 0,
            size: 20,
            sort: 'modified_at,desc',
            count: 0,
            search: ''
        },
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
    },
    extraReducers: {
        [findById.pending]: (state, acction) => {
            state.loading = true;
            state.error = false;
        },
        [findById.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.error = false;
            state.feedback = payload;
        },
        [findById.rejected]: (state, acction) => {
            state.loading = false;
            state.error = true;
        },
        [findAll.pending]: (state, acction) => {
            state.loading = true;
            state.error = false;
        },
        [findAll.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.feedbacks = action.payload.data;
            state.pageable = {
                ...state.pageable,
                count: action.payload.headers.count,
                page: action.payload.headers.page,
                pages: action.payload.headers.pages,
                size: action.payload.headers.size,
                sort: action.payload.headers.sort
            }
        },
        [findAll.rejected]: (state, acction) => {
            state.loading = false;
            state.error = true;
        },
        [update.pending]: (state, acction) => {
            state.loading = true;
            state.error = false;
        },
        [update.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
        },
        [update.rejected]: (state, acction) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const {
    onPageable
} = feedbackSlice.actions;

export default feedbackSlice;