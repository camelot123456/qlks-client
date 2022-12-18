import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as paymentLogService from 'service/paymentlog-service';

export const findAll = createAsyncThunk(
    'paymentLog/findAll',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.findAll(pageable);
            return paymentLogResponse;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getYearWithTheHighestRevenue = createAsyncThunk(
    'paymentLog/getYearWithTheHighestRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getYearWithTheHighestRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getWeeklyRevenue = createAsyncThunk(
    'paymentLog/getWeeklyRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getWeeklyRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getWeeklyRevenueOfTheYearWithTheHighestRevenue = createAsyncThunk(
    'paymentLog/getWeeklyRevenueOfTheYearWithTheHighestRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getWeeklyRevenueOfTheYearWithTheHighestRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getWeekOfTheYearWithTheHighestRevenue = createAsyncThunk(
    'paymentLog/getWeekOfTheYearWithTheHighestRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getWeekOfTheYearWithTheHighestRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getTodaysRevenue = createAsyncThunk(
    'paymentLog/getTodaysRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getTodaysRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getThisYearsRevenue = createAsyncThunk(
    'paymentLog/getThisYearsRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getThisYearsRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getRevenueStatisticsByYear = createAsyncThunk(
    'paymentLog/getRevenueStatisticsByYear',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getRevenueStatisticsByYear();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getQuarterlyRevenueOfTheYearWithTheHighestRevenue = createAsyncThunk(
    'paymentLog/getQuarterlyRevenueOfTheYearWithTheHighestRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getQuarterlyRevenueOfTheYearWithTheHighestRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getQuarterlyRevenueOfEachYear = createAsyncThunk(
    'paymentLog/getQuarterlyRevenueOfEachYear',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getQuarterlyRevenueOfEachYear();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getQuarterlyRevenueForTheCurrentYear = createAsyncThunk(
    'paymentLog/getQuarterlyRevenueForTheCurrentYear',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getQuarterlyRevenueForTheCurrentYear();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getQuarterOfTheYearWithTheHighestRevenue = createAsyncThunk(
    'paymentLog/getQuarterOfTheYearWithTheHighestRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getQuarterOfTheYearWithTheHighestRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getMonthlyRevenue = createAsyncThunk(
    'paymentLog/getMonthlyRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getMonthlyRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getMonthlyRevenueOfTheYearWithTheHighestRevenue = createAsyncThunk(
    'paymentLog/getMonthlyRevenueOfTheYearWithTheHighestRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getMonthlyRevenueOfTheYearWithTheHighestRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getMonthlyRevenueOfCurrentYear = createAsyncThunk(
    'paymentLog/getMonthlyRevenueOfCurrentYear',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getMonthlyRevenueOfCurrentYear();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getMonthOfTheYearWithTheHighestRevenue = createAsyncThunk(
    'paymentLog/getMonthOfTheYearWithTheHighestRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getMonthOfTheYearWithTheHighestRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getHighestRevenueDay = createAsyncThunk(
    'paymentLog/getHighestRevenueDay',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getHighestRevenueDay();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getCurrentYearsWeeklyRevenue = createAsyncThunk(
    'paymentLog/getCurrentYearsWeeklyRevenue',
    async(pageable, { rejectWithValue }) => {
        try {
            const paymentLogResponse = await paymentLogService.getCurrentYearsWeeklyRevenue();
            return paymentLogResponse.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const paymentLogSlice = createSlice({
    name: 'paymentLog',
    initialState: {
        loading: false,
        error: null,
        pageable: {
            page: 0,
            pages: 0,
            sort: 'paidAt,asc',
            size: 100,
            count: 0,
            search: ''
        },
        paymentLogs: [],
        revenue: {
            yearWithTheHighestRevenue: [],
            revenueStatisticsByYear: [],
            thisYearsRevenue: [],
            quarterlyRevenueOfEachYear: [],
            quarterlyRevenueOfTheYearWithTheHighestRevenue: [],
            quarterOfTheYearWithTheHighestRevenue: [],
            quarterlyRevenueForTheCurrentYear: [],
            monthlyRevenue: [],
            monthlyRevenueOfTheYearWithTheHighestRevenue: [],
            monthOfTheYearWithTheHighestRevenue: [],
            monthlyRevenueOfCurrentYear: [],
            weeklyRevenue: [],
            weeklyRevenueOfTheYearWithTheHighestRevenue: [],
            weekOfTheYearWithTheHighestRevenue: [],
            currentYearsWeeklyRevenue: [],
            highestRevenueDay: [],
            todaysRevenue: []
        }
    },
    reducers: {},
    extraReducers: {
        [findAll.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [findAll.fulfilled]: (state, action) => {
            state.loading = false;
            state.error = false;
            state.paymentLogs = action.payload.data;
            state.pageable = {
                ...state.pageable,
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
        [getYearWithTheHighestRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getYearWithTheHighestRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.yearWithTheHighestRevenue = payload;
        },
        [getYearWithTheHighestRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getWeeklyRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getWeeklyRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.weeklyRevenue = payload;
        },
        [getWeeklyRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getWeeklyRevenueOfTheYearWithTheHighestRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getWeeklyRevenueOfTheYearWithTheHighestRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.weeklyRevenueOfTheYearWithTheHighestRevenue = payload;
        },
        [getWeeklyRevenueOfTheYearWithTheHighestRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getWeekOfTheYearWithTheHighestRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getWeekOfTheYearWithTheHighestRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.weekOfTheYearWithTheHighestRevenue = payload;
        },
        [getWeekOfTheYearWithTheHighestRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getTodaysRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getTodaysRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.todaysRevenue = payload;
        },
        [getTodaysRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getThisYearsRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getThisYearsRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.thisYearsRevenue = payload;
        },
        [getThisYearsRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getRevenueStatisticsByYear.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getRevenueStatisticsByYear.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.revenueStatisticsByYear = payload;
        },
        [getRevenueStatisticsByYear.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getQuarterlyRevenueOfTheYearWithTheHighestRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getQuarterlyRevenueOfTheYearWithTheHighestRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.quarterlyRevenueOfTheYearWithTheHighestRevenue = payload;
        },
        [getQuarterlyRevenueOfTheYearWithTheHighestRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getQuarterlyRevenueOfEachYear.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getQuarterlyRevenueOfEachYear.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.quarterlyRevenueOfEachYear = payload;
        },
        [getQuarterlyRevenueOfEachYear.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getQuarterlyRevenueForTheCurrentYear.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getQuarterlyRevenueForTheCurrentYear.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.quarterlyRevenueForTheCurrentYear = payload;
        },
        [getQuarterlyRevenueForTheCurrentYear.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getQuarterOfTheYearWithTheHighestRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getQuarterOfTheYearWithTheHighestRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.quarterOfTheYearWithTheHighestRevenue = payload;
        },
        [getQuarterOfTheYearWithTheHighestRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getMonthlyRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getMonthlyRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.monthlyRevenue = payload;
        },
        [getMonthlyRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getMonthlyRevenueOfTheYearWithTheHighestRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getMonthlyRevenueOfTheYearWithTheHighestRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.monthlyRevenueOfTheYearWithTheHighestRevenue = payload;
        },
        [getMonthlyRevenueOfTheYearWithTheHighestRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getMonthlyRevenueOfCurrentYear.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getMonthlyRevenueOfCurrentYear.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.monthlyRevenueOfCurrentYear = payload;
        },
        [getMonthlyRevenueOfCurrentYear.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getMonthOfTheYearWithTheHighestRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getMonthOfTheYearWithTheHighestRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.monthOfTheYearWithTheHighestRevenue = payload;
        },
        [getMonthOfTheYearWithTheHighestRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getHighestRevenueDay.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getHighestRevenueDay.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.highestRevenueDay = payload;
        },
        [getHighestRevenueDay.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
        [getCurrentYearsWeeklyRevenue.pending]: (state, payload) => {
            state.loading = true;
            state.error = false;
        },
        [getCurrentYearsWeeklyRevenue.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.revenue.currentYearsWeeklyRevenue = payload;
        },
        [getCurrentYearsWeeklyRevenue.rejected]: (state, payload) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const { } = paymentLogSlice.actions;

export default paymentLogSlice;