import { httpClient } from "../config/axios-config";

const roomsConsole = (filterForm) => {
    return httpClient().get('/api/rooms/console', {params: {
        roomName: filterForm.roomName,
        idRoomType: filterForm.idRoomType,
        floor: filterForm.floor,
        minGuest: filterForm.minGuest,
        maxGuest: filterForm.maxGuest,
        datetime: filterForm.datetime,
        states: filterForm.states,
        page: filterForm.page,
        size: filterForm.size,
        sort: filterForm.sort,
        search: filterForm.search,
    }});
};

const roomsSchedule = (filterForm) => {
    return httpClient().get('/api/rooms/schedule', {params: {
        roomName: filterForm.roomName,
        idRoomType: filterForm.idRoomType,
        floor: filterForm.floor,
        minGuest: filterForm.minGuest,
        maxGuest: filterForm.maxGuest,
        from: filterForm.from,
        to: filterForm.to,
        states: filterForm.states,
        page: filterForm.page,
        size: filterForm.size,
        sort: filterForm.sort,
        search: filterForm.search,
    }});
};

const findAllRoomsToAddByIdBooking = (idBooking) => {
    return httpClient().get('/api/rooms/filter/rooms-to-add/' + idBooking);
};

const findAll = (pageable) => {
    return httpClient().get('/api/rooms', {params: {
        page: pageable.page,
        size: pageable.size,
        sort: pageable.sort,
        search: pageable.search,
    }});
};

export {
    roomsConsole,
    roomsSchedule,
    findAllRoomsToAddByIdBooking,
    findAll
};
