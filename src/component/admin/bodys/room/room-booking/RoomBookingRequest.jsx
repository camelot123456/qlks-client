import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllNotSetTheRooms } from "../../../../../redux/slice/booking-slice";
import FullPageLoader from '../../../../custom/FullPageLoader';

const RoomBookingRequest = () => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState();
    const { bookingNotSetRooms, error, loading } = useSelector(state => ({ ...state.booking }));
    const bookings = bookingNotSetRooms;

    useEffect(() => {
        dispatch(findAllNotSetTheRooms());
    }, []);

    return (
        <>
            <table class="table">
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
                    {bookings && bookings.map(booking => (
                        <tr key={booking.id}>
                            <th scope="row">{booking.id}</th>
                            <td>{booking.createdAt}</td>
                            <td>{booking.checkIn}</td>
                            <td>{booking.checkOut}</td>
                            <td>{booking.adultGuest}</td>
                            <td>{booking.childGuest}</td>
                            <td>{booking.fullName}</td>
                            <td>{booking.email}</td>
                            <td>
                                <span class="badge text-bg-success">{booking.state}</span>
                            </td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm">Xử lý</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loading && <FullPageLoader />}
        </>
    )
};

export default RoomBookingRequest;