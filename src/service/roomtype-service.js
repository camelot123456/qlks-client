import {httpClient} from "../config/axios-config";

const findAll = () => {
    return httpClient().get(`/api/roomtypes`);
};

const roomTypeSearch = (filterForm) => {
    return httpClient().get(`/api/roomtypes/search`, {
        params: {
            checkin: filterForm.checkin,
            checkout: filterForm.checkout,
            adultGuest: filterForm.adultGuest,
            childGuest: filterForm.childGuest,
            idRoomType: filterForm.idRoomType
        }
    });
};

export {
    findAll,
    roomTypeSearch
};