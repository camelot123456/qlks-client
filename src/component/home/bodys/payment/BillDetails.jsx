import {useEffect} from "react";
import BookingDetail from "../booking-order/BookingDetail";
import GuestDetailForm from "../booking-order/GuestDetailForm";

const BillDetail = () => {

    useEffect(() => {
    }, []);

    return (
        <>
            <div className="hstack gap-3">
                <BookingDetail />
                <GuestDetailForm />
            </div>

        </>
    )
};

export default BillDetail;
