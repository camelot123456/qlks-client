import BookingEditGuestInfo from "src/component/admin/bodys/room/booking-management/BookingEditGuestInfo";
import BookingEditDetail from "src/component/admin/bodys/room/booking-management/BookingEditDetail";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {findById, initBookingInfoEdit, resetState} from "src/redux/slice/booking-slice";
import { resetRoomtypeBookings, saveRoomtypeTemp } from "src/redux/slice/roomtype-slice";
import { resetServiceBooking, saveServiceTemp } from "src/redux/slice/service-slice";
import { resetDiscountBookings } from "src/redux/slice/discount-slice";

const BookingEditLayout = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(resetServiceBooking());
        dispatch(resetDiscountBookings());
        dispatch(resetRoomtypeBookings());
    }, []);

    useEffect(() => {
        dispatch(resetState());
        dispatch(findById(id))
            .then(({payload}) => {
                payload.roomTypeItems.forEach(item => {
                    dispatch(saveRoomtypeTemp({
                        id: item?.id,
                        name: item?.name,
                        quantity: item?.quantity,
                        price: item?.price
                    }));
                });
                payload.serviceItems.forEach(item => {
                    dispatch(saveServiceTemp({
                        id: item?.id,
                        name: item?.name,
                        quantity: item?.quantity,
                        price: item?.price
                    }));
                });
                dispatch(initBookingInfoEdit({
                    roomTypeBookings: payload.roomTypeItems,
                    serviceBookings: payload.serviceItems,
                    discountBookings: payload.discountItems,
                }));
            });
    }, [id]);

    return (
        <div className="container d-flex justify-content-between">
            <BookingEditDetail />
            <BookingEditGuestInfo />
        </div>
    )

};

export default BookingEditLayout;
