import BookingEditGuestInfo from "src/component/admin/bodys/room/booking-management/BookingEditGuestInfo";
import BookingEditDetail from "src/component/admin/bodys/room/booking-management/BookingEditDetail";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {findById, resetState} from "src/redux/slice/booking-slice";

const BookingEditLayout = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        // dispatch(resetState());
        dispatch(findById(id));
    }, [id]);

    return (
        <div className="container d-flex justify-content-between">
            <BookingEditDetail />
            <BookingEditGuestInfo />
        </div>
    )

};

export default BookingEditLayout;
