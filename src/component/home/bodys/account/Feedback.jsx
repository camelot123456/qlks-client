import FullPageLoader from "component/custom/FullPageLoader";
import Modal from "component/custom/Modal";
import Pagination from "component/custom/Pagination";
import { FEEDBACK_FIELDS } from "constants/constants";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAll, findById, onPageable } from "redux/slice/feedback-slice";
import FeedbackDetail from "./FeedbackDetail";

const Feedback = () => {

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [change, setChange] = useState(false);
    const {feedbacks, loading, pageable} = useSelector(state => ({...state.feedback}));

    useEffect(() => {
        dispatch(findAll({
            page: pageable?.page || 0,
            size: pageable?.size || 20,
            sort: pageable?.sort || 'modified_at,desc',
            search: pageable?.search || ''
        }));
        setChange(false);
    }, [change]);

    const handleOpenFeedbackDetail = (id) => {
        dispatch(findById(id))
            .then(() => {
                setShowModal(true);
            });
    };

    return (
        <div className='bg-light p-3 rounded border mt-4'>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NGÀY TẠO</th>
                    <th scope="col">NGÀY SỬA</th>
                    <th scope="col">RATE</th>
                    <th scope="col">NỘI DUNG</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                {feedbacks.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{item?.id}</th>
                        <td>{moment(item?.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{moment(item?.modifiedAt).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{item?.rating}</td>
                        <td>{item?.paidAt ? moment(item?.paidAt).format('DD/MM/YYYY HH:mm') : '--'}</td>
                        <td>{item?.content}</td>
                        <td>
                            <button className="btn btn-outline-primary"
                                    onClick={() => handleOpenFeedbackDetail(item?.id)}
                            >CHI TIẾT</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination pageable={pageable} onPageable={onPageable} 
                onChange={setChange} fields={FEEDBACK_FIELDS}/>
            {showModal && <Modal closeModal={setShowModal}
                                 content={<FeedbackDetail/>} width={'850'}/>}
            {loading && <FullPageLoader/>}
        </div>
    )
};

export default Feedback;