import { httpClient } from "../config/axios-config"

const findAll = (pageable) => {
    return httpClient().get('/api/orders', {
        params: {
            page: pageable.page,
            size: pageable.size,
            sort: pageable.sort,
            search: pageable.search,
        }
    });
};

const findAllByUser = (pageable) => {
    return httpClient().get('/api/orders/user', {
        params: {
            page: pageable.page,
            size: pageable.size,
            sort: pageable.sort,
            search: pageable.search,
        }
    });
};

const findById = (id) => {
    return httpClient().get('/api/orders/' + id);
};

const billPayment = (idOrderPaypal) => {
    return httpClient().get('/api/orders/bill-payment/' + idOrderPaypal);
};

const adminBillPayment = (idOrder) => {
    return httpClient().get('/api/orders/admin/bill-payment/' + idOrder);
};

export {
    findAll,
    findById,
    findAllByUser,
    billPayment,
    adminBillPayment
};
