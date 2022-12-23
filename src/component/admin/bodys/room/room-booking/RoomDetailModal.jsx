import {useDispatch} from "react-redux";
import {addRoomsIntoBookingRequest} from "src/redux/slice/booking-slice";

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
                    <th scope="col">HẠNG PHÒNG</th>
                    <th scope="col">SỐ PHÒNG</th>
                    <th scope="col">TỐI ĐA (KHÁCH)</th>
                    <th scope="col">TẦNG</th>
                    <th scope="col">GIÁ</th>
                    <th scope="col">#</th>
                </tr>
                </thead>
                <tbody>
                {rooms && rooms.map((room, index) => (
                    <tr key={index}>
                        <th scope="row">{room?.idRoom}</th>
                        <th scope="row">{room?.name}</th>
                        <td>PHÒNG {room?.roomName}</td>
                        <td>{room?.numberOfPeople} NGƯỜI</td>
                        <td>{room?.floor}</td>
                        <td>$ {room?.price}</td>
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
