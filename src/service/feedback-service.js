const { httpClient } = require("src/config/axios-config")

const findAll = (pageable) => {
    return httpClient().get('/api/feedbacks', {
        params: {
            page: pageable.page,
            size: pageable.size,
            sort: pageable.sort,
            search: pageable.search,
        }
    });
};

const findById = (idFeedback) => {
    return httpClient().get('/api/feedbacks/' + idFeedback);
};

const findAllByIdRoomtype = (idRoomtype) => {
    return httpClient().get('/api/feedbacks/roomtype/' + idRoomtype);
};

const save = (feedbackForm) => {
    return httpClient().post('/api/feedbacks', feedbackForm);
};

const update = (feedbackForm) => {
    return httpClient().put('/api/feedbacks', feedbackForm);
};

const deleteFeedback = (idFeedback) => {
    return httpClient().delete('/api/feedbacks/' + idFeedback);
};

export {
    findAll,
    findById,
    save,
    update,
    deleteFeedback,
    findAllByIdRoomtype
};
