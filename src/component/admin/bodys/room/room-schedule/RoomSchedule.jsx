import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAll } from "src/redux/slice/room-slice";

const RoomSchedule = () => {

    const dispatch = useDispatch();
    const roomReducer = useSelector(state => ({...state.room}));

    useEffect(() => {
        dispatch(findAll({
            page: '0',
            size: '500',
            sort: 'room_name, desc',
            search: ''
        }))
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

};

export default RoomSchedule;
