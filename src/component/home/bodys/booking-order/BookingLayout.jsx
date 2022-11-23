import BookingDetail from "./BookingDetail";
import GuestDetailForm from "./GuestDetailForm";

const BookingLayout = () => {

    return (
        <div className="container d-flex justify-content-between" style={{ marginTop: '150px' }}>
            <BookingDetail />
            <GuestDetailForm />
        </div>
    )

};

export default BookingLayout;