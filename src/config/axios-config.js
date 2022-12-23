import axios from "axios";
import { ACCESS_TOKEN } from "src/constants/constants";

export const httpClient = () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
        return axios.create({
            baseURL: process.env.REACT_APP_SERVICE_API_URL,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
    }
    return axios.create({
        baseURL: process.env.REACT_APP_SERVICE_API_URL
    });
}
