import { httpClient } from "src/config/axios-config";

const register = (registerForm) => {
    return httpClient().post('/api/register', registerForm);
};

const activateUser = (activationKey) => {
    return httpClient().get(`/api/activate?key=${activationKey}`);
};

const authenticate = () => {
    return httpClient().get('/api/authenticate');
};

const accountMe = () => {
    return httpClient().get('/api/account/me');
};

const updateAccount = (accountInfoForm) => {
    return httpClient().put('/api/account', accountInfoForm);
};

const changePassword = (changePasswordForm) => {
    return httpClient().patch('/api/account/change-password', changePasswordForm);
};

const resetPasswordInit = (resetPasswordForm) => {
    return httpClient().post('/api/account/reset-password/init', resetPasswordForm);
};

const resetPasswordFinish = (resetPasswordForm) => {
    return httpClient().post('/api/account/reset-password/finish', resetPasswordForm);
};

export {
    accountMe,
    activateUser,
    authenticate,
    changePassword,
    register,
    resetPasswordFinish,
    resetPasswordInit,
    updateAccount
};
