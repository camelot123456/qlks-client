const { httpClient } = require("config/axios-config")

const findAll = (pageable) => {
    return httpClient().get('/api/feedback', {
        params: {
            page: pageable.page,
            size: pageable.size,
            sort: pageable.sort,
            search: pageable.search,
        }
    });
};

const findById = (idFeedback) => {
    return httpClient().get('/api/feedback/' + idFeedback);
};

const save = (feedbackForm) => {
    return httpClient().post('/api/feedback', feedbackForm);
};

const update = (feedbackForm) => {
    return httpClient().put('/api/feedback', feedbackForm);
};

const deleteFeedback = (idFeedback) => {
    return httpClient().delete('/api/feedback/' + idFeedback);
};

export {
    findAll,
    findById,
    save,
    update,
    deleteFeedback
};