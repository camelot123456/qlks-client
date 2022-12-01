import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findAllByUser, onPageable} from '../../../../redux/slice/order-slice';
import FullPageLoader from '../../../custom/FullPageLoader';
import {findById} from "../../../../redux/slice/booking-slice";
import Modal from "../../../custom/Modal";
import HistoryDetail from "./HistoryDetail";
import Pagination from '../../../custom/Pagination';
import { ORDER_FIELDS } from '../../../../constants/constants';

const HistoryBooking = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [change, setChange] = useState(false);
    const {orders, loading, pageable} = useSelector(state => ({...state.order}));

    useEffect(() => {
        dispatch(findAllByUser({
            page: pageable?.page || 0,
            size: pageable?.size || 20,
            sort: pageable?.sort || 'modified_at,desc',
            search: pageable?.search || ''
        }));
        setChange(false);
    }, [change]);

    const handleOpenHistoryDetail = (idBooking) => {
        dispatch(findById(idBooking))
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
                    <th scope="col">TRẠNG THÁI</th>
                    <th scope="col">HÌNH THỨC</th>
                    <th scope="col">PHƯƠNG THỨC</th>
                    <th scope="col">THANH TOÁN</th>
                    <th scope="col">PHỤ PHÍ</th>
                    <th scope="col">TỔNG</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{item?.idOrder}</th>
                        <td><span className="badge text-bg-success">{item?.state}</span></td>
                        <td><span className="badge text-bg-primary">{item?.paymentType}</span></td>
                        <td><span className="badge text-bg-info">{item?.paymentMethod}</span></td>
                        <td>{item?.paidAt || ''}</td>
                        <td>$ {item?.surcharge}</td>
                        <td>$ {item?.grandTotal}</td>
                        <td>
                            <button className="btn btn-outline-primary"
                                    onClick={() => handleOpenHistoryDetail(item?.idBooking)}
                            >CHI TIẾT</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination pageable={pageable} onPageable={onPageable} 
                onChange={setChange} fields={ORDER_FIELDS}/>
            {showModal && <Modal closeModal={setShowModal}
                                 content={<HistoryDetail/>} width={'1200'}/>}
            {loading && <FullPageLoader/>}
        </div>
    )
};

export default HistoryBooking;
