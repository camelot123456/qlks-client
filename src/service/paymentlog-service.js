import { httpClient } from "../config/axios-config"

const findAll = (pageable) => {
    return httpClient().get('/api/payment/logs', {
        params: {
            page: pageable.page,
            size: pageable.size,
            sort: pageable.sort,
            search: pageable.search,
        }
    });
};

const getYearWithTheHighestRevenue = (pageable) => {
    return httpClient().get('/api/payment/logs/getYearWithTheHighestRevenue');
};

const getWeeklyRevenue = () => {
    return httpClient().get('/api/payment/logs/getWeeklyRevenue');
};

const getWeeklyRevenueOfTheYearWithTheHighestRevenue = () => {
    return httpClient().get('/api/payment/logs/getWeeklyRevenueOfTheYearWithTheHighestRevenue');
};

const getWeekOfTheYearWithTheHighestRevenue = () => {
    return httpClient().get('/api/payment/logs/getWeekOfTheYearWithTheHighestRevenue');
};

const getTodaysRevenue = () => {
    return httpClient().get('/api/payment/logs/getTodaysRevenue');
};

const getThisYearsRevenue = () => {
    return httpClient().get('/api/payment/logs/getThisYearsRevenue');
};

const getRevenueStatisticsByYear = () => {
    return httpClient().get('/api/payment/logs/getRevenueStatisticsByYear');
};

const getQuarterlyRevenueOfTheYearWithTheHighestRevenue = () => {
    return httpClient().get('/api/payment/logs/getQuarterlyRevenueOfTheYearWithTheHighestRevenue');
};

const getQuarterlyRevenueOfEachYear = () => {
    return httpClient().get('/api/payment/logs/getQuarterlyRevenueOfEachYear');
};

const getQuarterlyRevenueForTheCurrentYear = () => {
    return httpClient().get('/api/payment/logs/getQuarterlyRevenueForTheCurrentYear');
};

const getQuarterOfTheYearWithTheHighestRevenue = () => {
    return httpClient().get('/api/payment/logs/getQuarterOfTheYearWithTheHighestRevenue');
};

const getMonthlyRevenue = () => {
    return httpClient().get('/api/payment/logs/getMonthlyRevenue');
};

const getMonthlyRevenueOfTheYearWithTheHighestRevenue = () => {
    return httpClient().get('/api/payment/logs/getMonthlyRevenueOfTheYearWithTheHighestRevenue');
};

const getMonthlyRevenueOfCurrentYear = () => {
    return httpClient().get('/api/payment/logs/getMonthlyRevenueOfCurrentYear');
};

const getMonthOfTheYearWithTheHighestRevenue = () => {
    return httpClient().get('/api/payment/logs/getMonthOfTheYearWithTheHighestRevenue');
};

const getHighestRevenueDay = () => {
    return httpClient().get('/api/payment/logs/getHighestRevenueDay');
};

const getCurrentYearsWeeklyRevenue = () => {
    return httpClient().get('/api/payment/logs/getCurrentYearsWeeklyRevenue');
};

export {
    findAll,
    getYearWithTheHighestRevenue,
    getWeeklyRevenue,
    getWeeklyRevenueOfTheYearWithTheHighestRevenue,
    getWeekOfTheYearWithTheHighestRevenue,
    getTodaysRevenue,
    getThisYearsRevenue,
    getRevenueStatisticsByYear,
    getQuarterlyRevenueOfTheYearWithTheHighestRevenue,
    getQuarterlyRevenueOfEachYear,
    getQuarterlyRevenueForTheCurrentYear,
    getQuarterOfTheYearWithTheHighestRevenue,
    getMonthlyRevenue,
    getMonthlyRevenueOfTheYearWithTheHighestRevenue,
    getMonthlyRevenueOfCurrentYear,
    getMonthOfTheYearWithTheHighestRevenue,
    getHighestRevenueDay,
    getCurrentYearsWeeklyRevenue,
};