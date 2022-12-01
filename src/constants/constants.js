const ACCESS_TOKEN = 'access_token';
const LOCAL_TIME_REGEX = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/i;
const ROOMTYPE_CART = 'roomtype_cart';
const TOKEN_PAYPAL = 'token';
const PAYER_ID_PAYPAL = 'PayerID';
const ID_ORDER_PAYMENT = 'idOrderPayment';
const PAYMENT_METHOD = {
    CASH: 'CASH',
    CHECKS: 'CHECKS',
    DEBIT_CARDS: 'DEBIT_CARDS',
    CREDIT_CARDS: 'CREDIT_CARDS',
    MOBILE_PAYMENTS: 'MOBILE_PAYMENTS',
    ELECTRONIC_BANK_TRANFERS: 'ELECTRONIC_BANK_TRANFERS'
};
const PAYMENT_TYPE = {
    PREPAID: 'PREPAID',
    POSTPAID: 'POSTPAID',
    DEPOSIT: 'DEPOSIT'
};

const ORDER_FIELDS = [
    {key: 'createdAt', value: 'Ngày tạo'},
    {key: 'modifiedAt', value: 'Ngày sửa'},
    {key: 'paidAt', value: 'Ngày thanh toán'},
    {key: 'idBooking', value: 'Mã booking'},
    {key: 'idOrder', value: 'Mã hóa đơn'},
];
export {
    ACCESS_TOKEN,
    LOCAL_TIME_REGEX,
    ROOMTYPE_CART,
    PAYMENT_METHOD,
    PAYMENT_TYPE,
    TOKEN_PAYPAL,
    PAYER_ID_PAYPAL,
    ID_ORDER_PAYMENT,
    ORDER_FIELDS
};
