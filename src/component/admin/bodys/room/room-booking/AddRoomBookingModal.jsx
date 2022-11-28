import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddRoomBookingModal = () => {

    const dispatch = useDispatch();
    const { roomsToAdd, loading, error } = useSelector(state => ({ ...state.room }));

    useEffect(() => {

    }, []);

    return (
        <>
            {roomsToAdd && roomsToAdd.map(item => (
                <div key={item?.roomType}>
                    <h3>{item?.roomType}</h3>
                    <RoomDetail rooms={item?.rooms} />
                </div>
            ))}
        </>
    )

};

export default AddRoomBookingModal;

export const RoomDetail = ({ rooms }) => {
    console.log(rooms);
    return (
        <div>
            <table class="table table-hover">
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
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id={room?.idRoom} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="float-end btn btn-outline-primary">LƯU</button>
        </div>
    );
}