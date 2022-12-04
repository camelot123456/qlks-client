import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "../../../../custom/FullPageLoader";
import {
  handlePageable,
  roomSchedule,
} from "../../../../../redux/slice/room-slice";
import Pagination from "../../../../custom/Pagination";
import { ROOM_FIELDS } from "../../../../../constants/constants";
import { ROOM_STATE } from "../../../../../constants/roomstate";

const RoomDisplay = () => {
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const { roomsSchedule, loading, pageableSchedule } = useSelector((state) => ({
    ...state.room,
  }));

  useEffect(() => {
    dispatch(
      roomSchedule({
        from: pageableSchedule.from || "",
        to: pageableSchedule.to || "",
        roomName: pageableSchedule.roomName || "",
        idRoomType: pageableSchedule.idRoomType || "",
        floor: pageableSchedule.floor || "",
        minGuest: pageableSchedule.minGuest || 0,
        maxGuest: pageableSchedule.maxGuest || 100,
        states: pageableSchedule.states || "",
        page: pageableSchedule.page || 0,
        size: pageableSchedule.size || 20,
        sort: pageableSchedule.sort || "idRoom,desc",
        search: pageableSchedule.search || "",
      })
    );
    setChange(false);
  }, [change]);

  return (
    <div className="vstack gap-3">
      <div className="d-flex align-content-start flex-wrap">
        {roomsSchedule &&
          roomsSchedule.map((room, index) => (
            <div
              key={index}
              className="card text-bg-secondary mb-3 me-3"
              style={{ maxWidth: "200px" }}
            >
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
              {room?.state === "BOOKED" && (
                <div className="card-footer d-flex justify-content-evenly">
                  <button className="btn btn-outline-light btn-sm ">
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-outline-light btn-sm ">
                    <i className="fa fa-ban" aria-hidden="true"></i>
                  </button>
                </div>
              )}
              {room?.state === "OCCUPIED" && (
                <div className="card-footer d-flex justify-content-evenly">
                  <button className="btn btn-outline-light btn-sm ">
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-outline-light btn-sm ">
                    <i className="fa fa-ban" aria-hidden="true"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <Pagination
        onChange={setChange}
        onPageable={handlePageable}
        pageable={pageableSchedule}
        fields={ROOM_FIELDS}
      />
      {loading && <FullPageLoader />}
    </div>
  );
};

export default RoomDisplay;
