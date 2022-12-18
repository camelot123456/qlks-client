import { httpClient } from "config/axios-config"

const findAll = (pageable) => {
    return httpClient().get('/api/services', {
        params: {
            page: pageable.page,
            size: pageable.size,
            sort: pageable.sort,
            search: pageable.search,
        }
    })
};

const findById = (id) => {
    return httpClient().get('/api/services/' + id);
};

export {
    findAll,
    findById
};