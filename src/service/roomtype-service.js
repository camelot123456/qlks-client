import { httpClient } from "../config/axios-config";

const findAll = () => {
    return httpClient().get(`/api/roomtypes`);
};

export {
    findAll,
};