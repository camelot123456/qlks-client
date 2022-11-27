import { useEffect } from "react";
import { useSelector } from "react-redux";
import FullPageLoader from "../../../../custom/FullPageLoader";

const RoomDisplay = () => {

    const {roomsConsole, loading, error} = useSelector(state => ({ ...state.room }));

    useEffect(() => {
        console.log(roomsConsole);
        // dispatch(roomConsole());
    }, [roomsConsole, loading]);

    return (
        <div className="d-flex align-content-start flex-wrap">
            {roomsConsole && roomsConsole.map(room => (
                <div className="card text-bg-secondary mb-3 me-3" style={{ maxWidth: '200px' }}>
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
            {loading && <FullPageLoader />}
        </div>
    )
};

export default RoomDisplay;