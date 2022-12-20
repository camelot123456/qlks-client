import FullPageLoader from "component/custom/FullPageLoader";
import Pagination from "component/custom/Pagination";
import { FEEDBACK_FIELDS } from "constants/constants";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAll, onPageable } from "redux/slice/feedback-slice";
import { Link } from 'react-router-dom';

const Feedback = () => {

    const dispatch = useDispatch();
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
        console.log(feedbacks);
    }, [change]);

    return (
        <div className='bg-light p-3 rounded border mt-4'>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">HẠNG PHÒNG</th>
                    <th scope="col">SỐ PHÒNG</th>
                    <th scope="col">RATE</th>
                    <th scope="col">NỘI DUNG</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                {feedbacks && feedbacks.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{item?.id}</th>
                        <td>{item?.room?.roomType?.name}</td>
                        <td>
                            <span className="badge text-bg-success">
                                {item?.room?.roomName}
                            </span>
                        </td>
                        <td>{item?.rating}</td>
                        <td>{item?.content}</td>
                        <td>
                            <Link className="btn btn-outline-primary"
                                to={`/account/feedback/${item?.id}/detail`}
                            >
                                CHI TIẾT
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination pageable={pageable} onPageable={onPageable} 
                onChange={setChange} fields={FEEDBACK_FIELDS}/>
            {loading && <FullPageLoader/>}
        </div>
    )
};

export default Feedback;