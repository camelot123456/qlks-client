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

const addRoomsIntoBooking = (bookingForm) => {
    return httpClient().post('/api/booking/room', bookingForm);
};

const checkinBooking = (idBooking) => {
    return httpClient().get('/api/booking/checkin/' + idBooking);
};

const changeRoomBooking = (changeRoomBookingPayload) => {
    return httpClient().post('/api/booking/change/room', changeRoomBookingPayload);
};

export {
    createBookingRequest,
    findById,
    findAllNotSetTheRooms,
    addRoomsIntoBooking,
    checkinBooking,
    changeRoomBooking
};