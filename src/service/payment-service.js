import {httpClient} from "../config/axios-config";

const createOrderPaypal = (idBooking) => {
    return httpClient().get('/api/payment/create-order/' + idBooking);
};

const findOrderDetailPaypal = (idOrderPaypal) => {
    return httpClient().get('/api/payment/order-detail/' + idOrderPaypal);
};

const captureOrderPaypal = (idOrderPaypal) => {
    return httpClient().get('/api/payment/capture-order/' + idOrderPaypal);
};

const captureOrderPaypalByUUID = (uuidOrderPaypal) => {
    return httpClient().get('/api/payment/capture-order/uuid/' + uuidOrderPaypal);
};

export {
    createOrderPaypal,
    findOrderDetailPaypal,
    captureOrderPaypal,
    captureOrderPaypalByUUID
};
