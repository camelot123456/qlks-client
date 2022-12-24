import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookingDetail from "./BookingDetail";
import GuestDetailForm from "./GuestDetailForm";

const BookingLayout = () => {

    const bookingReducer = useSelector(state => ({ ...state.booking }));
    const navigate = useNavigate();

    useEffect(() => {
        if (bookingReducer.idTemp === null) {
            navigate('/booking')
        }
    }, []);

    return (
        <div className="container d-flex justify-content-between" style={{ marginTop: '150px' }}>
            <BookingDetail />
            <GuestDetailForm />
        </div>
    )

};

export default BookingLayout;
