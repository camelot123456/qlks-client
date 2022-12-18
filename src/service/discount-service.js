import { httpClient } from "config/axios-config";

const findByGiftCode = (giftCode) => {
    return httpClient().get('/api/discounts/' + giftCode);
};

const isExpireByGiftCode = (giftCode) => {
    return httpClient().get('/api/discounts/expire/' + giftCode);
};

export {
    findByGiftCode,
    isExpireByGiftCode
};