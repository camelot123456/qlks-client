import moment from "moment";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addIdBookingIntoBookingRequest, findAllNotSetTheRooms} from "../../../../../redux/slice/booking-slice";
import {findAllRoomsToAddByIdBooking} from "../../../../../redux/slice/room-slice";
import FullPageLoader from '../../../../custom/FullPageLoader';
import Modal from '../../../../custom/Modal';
import AddRoomBookingModal from "./AddRoomBookingModal";

const RoomBookingRequest = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState();
    const {bookingNotSetRooms, error, loading} = useSelector(state => ({...state.booking}));
    const bookings = bookingNotSetRooms;

    useEffect(() => {
        dispatch(findAllNotSetTheRooms());
    }, []);

    const handleOpenModal = (idBooking) => {
        setShowModal(true);
        dispatch(addIdBookingIntoBookingRequest(idBooking));
        dispatch(findAllRoomsToAddByIdBooking(idBooking));
    };

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Ngày tạo</th>
                    <th scope="col">Checkin</th>
                    <th scope="col">Checkout</th>
                    <th scope="col">Người lớn</th>
                    <th scope="col">Trẻ em</th>
                    <th scope="col">Tên khách</th>
                    <th scope="col">Email</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                {bookings?.length > 0 
                ? (bookings.map(booking => (
                    <tr key={booking.id}>
                        <th scope="row">{booking.id}</th>
                        <td>{moment(booking.createdAt).startOf('month').format('DD/MM/YYYY HH:mm')}</td>
                        <td>{moment(booking.checkIn).startOf('month').format('DD/MM/YYYY HH:mm')}</td>
                        <td>{moment(booking.checkOut).startOf('month').format('DD/MM/YYYY HH:mm')}</td>
                        <td>{booking.adultGuest}</td>
                        <td>{booking.childGuest}</td>
                        <td>{booking.fullName}</td>
                        <td>{booking.email}</td>
                        <td>
                            <span className="badge text-bg-success">{booking.state}</span>
                        </td>
                        <td>
                            <button className="btn btn-outline-primary btn-sm"
                                    onClick={() => handleOpenModal(booking.id)}
                            >Xử lý
                            </button>
                        </td>
                    </tr>
                ))) 
                : (
                    <tr>
                        <td colSpan={10}><p className="text-center">Danh sách trống</p></td>
                    </tr>
                )
                }
                </tbody>
            </table>
            {showModal && <Modal closeModal={setShowModal}
                content={<AddRoomBookingModal closeModal={setShowModal} />}
                title={'CÁC PHÒNG HỢP LỆ'} />}
            {loading && <FullPageLoader/>}
        </>
    )
};

export default RoomBookingRequest;
