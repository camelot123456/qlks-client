import {useDispatch, useSelector} from "react-redux";
import {
    addRoomsIntoBooking,
    findAllNotSetTheRooms
} from "src/redux/slice/booking-slice";
import {toast} from "react-toastify";
import FullPageLoader from "src/component/custom/FullPageLoader";
import RoomDetailModal from "./RoomDetailModal";
import React from "react";

const AddRoomBookingModal = ({idBooking, closeModal}) => {

    const dispatch = useDispatch();
    const {roomsToAdd} = useSelector(state => ({...state.room}));
    const {roomsToAddRequest, loading, error} = useSelector(state => ({...state.booking}));

    const handleSaveRequest = () => {
        dispatch(addRoomsIntoBooking(roomsToAddRequest))
            .then(response => {
                if (!response?.error) {
                    dispatch(findAllNotSetTheRooms());
                    toast.success('Saved');
                    closeModal(false);
                } else {
                    toast.error('Failure');
                }
            });

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
            <button className="float-end btn btn-outline-primary"
                    onClick={() => handleSaveRequest()}
            >LƯU
            </button>
            {loading && <FullPageLoader/>}
        </>
    )

};

export default AddRoomBookingModal;
