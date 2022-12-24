import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteById, onPageable} from 'src/redux/slice/booking-slice';
import FullPageLoader from 'src/component/custom/FullPageLoader';
import {findById} from "src/redux/slice/booking-slice";
import Modal from "src/component/custom/Modal";
import Pagination from 'src/component/custom/Pagination';
import { BOOKING_FIELDS } from 'src/constants/constants';
import moment from 'moment';
import { findAll } from 'src/redux/slice/booking-slice';
import BookingDetail from './BookingDetail';
import { toast } from 'react-toastify';
import { resetServiceBooking } from 'src/redux/slice/service-slice';
import { resetDiscountBookings } from 'src/redux/slice/discount-slice';
import { resetRoomtypeBookings } from 'src/redux/slice/roomtype-slice';

const BookingList = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [change, setChange] = useState(false);
    const {bookings, loading, pageable} = useSelector(state => ({...state.booking}));

    useEffect(() => {
        dispatch(resetServiceBooking());
        dispatch(resetDiscountBookings());
        dispatch(resetRoomtypeBookings());
    }, []);

    useEffect(() => {
        dispatch(findAll({
            page: pageable?.page || 0,
            size: pageable?.size || 20,
            sort: pageable?.sort || 'modifiedAt,desc',
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

    const handleDelete = (idBooking) => {
        const confirm = window.confirm('Bạn có muốn xóa Booking ID là ' + idBooking);
        if (confirm) {
            dispatch(deleteById(idBooking))
                .then(res => {
                    if (!res.error) {
                        toast.success('Xóa thành công');
                        setChange(prev => !prev);
                    } else {
                        toast.error('Xóa thất bại');
                    }
                })
        } else return;
    };

    return (
        <div className='bg-light p-3 rounded border mt-4'>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NGÀY TẠO</th>
                    <th scope="col">NGÀY SỬA</th>
                    <th scope="col">CHECKIN</th>
                    <th scope="col">CHECKOUT</th>
                    <th scope="col">NGƯỜI LỚN</th>
                    <th scope="col">TRẺ EM</th>
                    <th scope="col">TRẠNG THÁI</th>
                    <th scope="col">TÊN KHÁCH</th>
                    <th scope="col" colSpan={2}>#</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((item, index) => (
                    <tr key={index}>
                        <th scope="row">{item?.id}</th>
                        <td>{moment(item?.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{moment(item?.modifiedAt).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{moment(item?.checkIn).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{moment(item?.checkOut).format('DD/MM/YYYY HH:mm')}</td>
                        <td>{item?.adultGuest}</td>
                        <td>{item?.childGuest}</td>
                        <td><span className="badge text-bg-success">{item?.state}</span></td>
                        <td>{item?.fullName}</td>
                        <td>
                            <button className="btn btn-outline-danger btn-sm"
                                    onClick={() => handleDelete(item?.id)}
                            >XÓA</button>
                        </td>
                        <td>
                            <button className="btn btn-outline-primary btn-sm"
                                    onClick={() => handleOpenHistoryDetail(item?.id)}
                            >XEM</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination pageable={pageable} onPageable={onPageable} 
                onChange={setChange} fields={BOOKING_FIELDS}/>
            {showModal && <Modal closeModal={setShowModal}
                content={<BookingDetail />} width={'850'}/>}
            {loading && <FullPageLoader/>}
        </div>
    )
};

export default BookingList;
