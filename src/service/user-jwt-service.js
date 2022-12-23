import { httpClient } from "src/config/axios-config";

const getAccessToken = (loginForm) => {
    return httpClient().post('/api/authenticate', loginForm);
};

export {
    getAccessToken,
};
