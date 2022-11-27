import { httpClient } from "../config/axios-config"

const createBookingRequest = (bookingForm) => {
    return httpClient().post('/api/booking', bookingForm);
};

const findById = (idBooking) => {
    return httpClient().get('/api/booking/' + idBooking);
};

const findAllNotSetTheRooms = () => {
    return httpClient().get('/api/booking/not-set-the-room');
};

export {
    createBookingRequest,
    findById,
    findAllNotSetTheRooms
};