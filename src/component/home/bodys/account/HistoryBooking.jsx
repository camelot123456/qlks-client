import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findAllByUser} from '../../../../redux/slice/order-slice';
import FullPageLoader from '../../../custom/FullPageLoader';
import {findById} from "../../../../redux/slice/booking-slice";
import Modal from "../../../custom/Modal";
import HistoryDetail from "./HistoryDetail";

const HistoryBooking = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const {orders, loading} = useSelector(state => ({...state.order}));

    useEffect(() => {
        dispatch(findAllByUser({
            page: 0,
            size: 20,
            sort: 'id,asc',
            search: ''
        }));
    }, []);

    const handleOpenHistoryDetail = (idBooking) => {
        dispatch(findById(idBooking))
            .then(() => {
                setShowModal(true);
            });
    };

    return (
        <>
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
                {orders.length && orders.map(item => (
                    <tr key={item?.id}>
                        <th scope="row">{item?.id}</th>
                        <td>{item?.state}</td>
                        <td>{item?.paymentType}</td>
                        <td>{item?.paymentMethod}</td>
                        <td>{item?.paidAt || ''}</td>
                        <td>{item?.surcharge}</td>
                        <td>{item?.grandTotal}</td>
                        <td>
                            <button className="btn btn-outline-primary"
                                    onClick={() => handleOpenHistoryDetail(item?.idBooking)}
                            >CHI TIẾT</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {showModal && <Modal closeModal={setShowModal}
                                 content={<HistoryDetail/>} width={'1200'}/>}
            {loading && <FullPageLoader/>}
        </>
    )
};

export default HistoryBooking;
