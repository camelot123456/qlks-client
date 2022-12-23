import {useDispatch, useSelector} from "react-redux";
import {
    addRoomsIntoBooking,
    findAllNotSetTheRooms,
    findById
} from "src/redux/slice/booking-slice";
import {toast} from "react-toastify";
import FullPageLoader from "src/component/custom/FullPageLoader";
import RoomDetailModal from "./RoomDetailModal";
import React, {useEffect, useState} from "react";
import {PAYMENT_TYPE} from "src/constants/constants";

const AddRoomBookingModal = ({idBooking, closeModal}) => {

    const dispatch = useDispatch();
    const [isRefund, setIsRefund] = useState(false);
    const {roomsToAdd} = useSelector(state => ({...state.room}));
    const {roomsToAddRequest, loading, error, bookingInfo} = useSelector(state => ({...state.booking}));

    useEffect(() => {
        dispatch(findById(idBooking))
            .then(() => {
                setIsRefund(bookingInfo?.order?.paymentType.includes(PAYMENT_TYPE.PREPAID));
            });
    }, []);

    const handleSaveRequest = () => {
        dispatch(addRoomsIntoBooking(roomsToAddRequest))
            .then(() => {
                if (!error) {
                    dispatch(findAllNotSetTheRooms());
                    toast.success('Saved');
                    closeModal(false);
                } else {
                    toast.error('Failure');
                }
            });
    };

    const checkRoomEmpty = () => {
        return roomsToAdd.some(roomItem => roomItem?.rooms.length === 0);
    };

    return (
        <>
            {roomsToAdd && roomsToAdd.map((item, index) => (
                <div key={index}>
                    <h3>{`${item?.roomType} - `}<span className="text-danger">{`SỐ LƯỢNG: ${item?.quantity}`}</span>
                    </h3>
                    <RoomDetailModal rooms={item?.rooms} idBooking={idBooking}/>
                </div>
            ))}
            {roomsToAdd && checkRoomEmpty() ? (
                isRefund ? (
                    <button className="float-end btn btn-outline-danger"
                            onClick={() => handleSaveRequest()}
                    >HOÀN TIỀN</button>
                ) : (
                    <button className="float-end btn btn-outline-secondary"
                            onClick={() => handleSaveRequest()}
                    >HỦY YÊU CẦU</button>)
            ) : (
                <button className="float-end btn btn-outline-primary"
                        onClick={() => handleSaveRequest()}
                >LƯU</button>)}
            {loading && <FullPageLoader/>}
        </>
    )

};

export default AddRoomBookingModal;
