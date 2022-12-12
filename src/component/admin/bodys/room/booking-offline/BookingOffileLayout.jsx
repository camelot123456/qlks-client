import BookingOfflineDetail from "./BookingOfflineDetail";
import BookingOfflineGuestInfo from "./BookingOfflineGuestInfo";

const BookingOffineLayout = () => {

    return (
        <div className="container d-flex justify-content-between">
            <BookingOfflineDetail />
            <BookingOfflineGuestInfo />
        </div>
    )

};

export default BookingOffineLayout;