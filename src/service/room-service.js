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

const findAllRoomsToAddByIdBooking = (idBooking) => {
    return httpClient().get('/api/rooms/filter/rooms-to-add/' + idBooking);
};



export {
    roomsConsole,
    findAllRoomsToAddByIdBooking
};
