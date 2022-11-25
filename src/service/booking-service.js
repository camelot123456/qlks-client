import { httpClient } from "../config/axios-config"

const createBookingRequest = (bookingForm) => {
    return httpClient().post('/api/booking', bookingForm);
};

export {
    createBookingRequest
};