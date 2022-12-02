import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "../../../../custom/FullPageLoader";
import { getDatetimeNow } from "../../../../../util/util";
import { onPageable, roomConsole } from "../../../../../redux/slice/room-slice";
import Pagination from "../../../../custom/Pagination";
import { ROOM_FIELDS } from "../../../../../constants/constants";

const RoomDisplay = () => {
    const [change, setChange] = useState(false);
    const dispatch = useDispatch();
    const { roomsConsole, loading, pageable } = useSelector(state => ({ ...state.room }));

    useEffect(() => {
        dispatch(roomConsole({
            datetime: getDatetimeNow(),
            roomName: '',
            idRoomType: '',
            floor: '',
            minGuest: 0,
            maxGuest: 100,
            states: '',
            page: pageable?.page || 0,
            size: pageable?.size || 20,
            sort: pageable?.sort || 'idRoom,desc',
            search: pageable?.search || ''
        }));
        setChange(false);
    }, [change]);

    return (
        <div className="vstack gap-3">
            <div className="d-flex align-content-start flex-wrap">
                {roomsConsole && roomsConsole.map((room, index) => (
                    <div key={index} className="card text-bg-secondary mb-3 me-3" style={{ maxWidth: '200px' }}>
                        <div className="card-header hstack">
                            <button className="btn btn-outline-light btn-sm me-auto">
                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-outline-light btn-sm ">
                                <i className="fa fa-commenting" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="card-body text-center">
                            <h5 className="card-title">PHÒNG {room.roomName}</h5>
                            <p className="card-text">{room.state}</p>
                            <p className="card-text">{room.checkIn}</p>
                            <p className="card-text">{room.checkOut}</p>
                            <p className="card-text">{room.fullName}</p>
                        </div>
                        <div className="card-footer hstack gap-2 text-center">
                            <button className="btn btn-outline-light btn-sm ">
                                <i className="fa fa-sign-in" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-outline-light btn-sm ">
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-outline-light btn-sm ">
                                <i className="fa fa-ban" aria-hidden="true"></i>
                            </button>
                            <button className="btn btn-outline-light btn-sm ">
                                <i className="fa fa-commenting" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination onChange={setChange} onPageable={onPageable} pageable={pageable} fields={ROOM_FIELDS} />
            {loading && <FullPageLoader />}
        </div>
    )
};

export default RoomDisplay;
