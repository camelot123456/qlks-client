import {useDispatch} from "react-redux";
import {addRoomsIntoBookingRequest} from "../../../../../redux/slice/booking-slice";

const RoomDetailModal = ({ rooms }) => {
    const dispatch = useDispatch();

    const handleUpdateRoomAccept = () => {

        const inputRoomList = Array.from(document.querySelectorAll(`input[type=checkbox]:checked`));
        const output = inputRoomList.map(item => {
            return {
                id: item?.id,
                note: ''
            }
        });
        dispatch(addRoomsIntoBookingRequest(output));
    };

    return (
        <div>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">ROOM TYPE</th>
                    <th scope="col">ROOM NUMBER</th>
                    <th scope="col">MAX</th>
                    <th scope="col">FLOOR</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                {rooms && rooms.map((room, index) => (
                    <tr key={index}>
                        <th scope="row">{room?.idRoom}</th>
                        <th scope="row">{room?.name}</th>
                        <td>{room?.numberOfPeople}</td>
                        <td>{room?.roomName}</td>
                        <td>{room?.floor}</td>
                        <td>{room?.price}</td>
                        <td>
                            <div className="form-check">
                                <input className="form-check-input checkbox-accept"
                                       type="checkbox" value={room?.idRoom}
                                       id={room?.idRoom} onChange={() => handleUpdateRoomAccept()}/>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomDetailModal;
