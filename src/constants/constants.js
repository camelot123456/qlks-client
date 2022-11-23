const ACCESS_TOKEN = 'access_token';
const LOCAL_TIME_REGEX = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/i;
const ROOMTYPE_CART = 'roomtype_cart';
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
}
export {
    ACCESS_TOKEN,
    LOCAL_TIME_REGEX,
    ROOMTYPE_CART,
    PAYMENT_METHOD,
    PAYMENT_TYPE
};