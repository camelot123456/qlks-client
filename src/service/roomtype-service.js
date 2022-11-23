import {httpClient} from "../config/axios-config";

const findAll = (pageable) => {
    return httpClient().get(`/api/roomtypes`, {
        params: {
            page: pageable.page,
            size: pageable.size,
            sort: pageable.sort,
            search: pageable.search,
        }
    });
};

const findById = (id) => {
    return httpClient().get(`/api/roomtypes/${id}`);
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
    findById,
    roomTypeSearch
};