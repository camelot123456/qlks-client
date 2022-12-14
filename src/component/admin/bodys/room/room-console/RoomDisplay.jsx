import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "../../../../custom/FullPageLoader";
import {
  handlePageable,
  roomSchedule,
} from "../../../../../redux/slice/room-slice";
import Pagination from "../../../../custom/Pagination";
import { ROOM_FIELDS } from "../../../../../constants/constants";
import { toast } from "react-toastify";
import { checkinBooking, cleanFinishBooking, cleanRoomBooking, findById } from "../../../../../redux/slice/booking-slice";
import moment from "moment";
import RoomBillPayment from "./RoomBillPayment";
import Modal from "../../../../custom/Modal";

const RoomDisplay = () => {
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { roomsSchedule, loading, pageableSchedule } = useSelector((state) => ({
    ...state.room,
  }));

  const bookingReducer = useSelector((state) => ({
    ...state.booking,
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

  const handleCheckin = (idBooking) => {
    dispatch(checkinBooking(idBooking))
      .then(() => {
        if (!bookingReducer.error) {
          toast.success(idBooking);
          setChange(prev => !prev);
        } else toast.error('failure');
      });
  };

  const handleCheckout = (idBooking) => {
    dispatch(findById(idBooking))
      .then(() => {
          setShowModal(true);
      });
  };

  const handleClean = (idBooking) => {
    dispatch(cleanRoomBooking(idBooking))
      .then(() => {
        if (!bookingReducer.error) {
          toast.success(idBooking);
          setChange(prev => !prev);
        } else toast.error('failure');
      });
  };

  const handleCleanFinish = (idBooking) => {
    dispatch(cleanFinishBooking(idBooking))
      .then(() => {
        if (!bookingReducer.error) {
          toast.success(idBooking);
          setChange(prev => !prev);
        } else toast.error('failure');
      });
  };

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
              <div className="card-body text-center" style={{lineHeight: '0.5'}}>
                <h5 className="card-title">PHÒNG {room.roomName}</h5>
                <p className="card-text">{room.state}</p>
                <p className="card-text">{moment(room.checkIn).format('DD/MM/YYYY HH:mm')}</p>
                <p className="card-text">{moment(room.checkOut).format('DD/MM/YYYY HH:mm')}</p>
                <p className="card-text">{room.fullName}</p>
              </div>
              {room?.state === "BOOKED" && (
                <div className="card-footer d-flex justify-content-evenly">
                  <button className="btn btn-outline-light btn-sm "
                    onClick={() => handleCheckin(room.idBooking)}
                  >
                    <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-outline-light btn-sm ">
                    <i className="fa fa-ban" aria-hidden="true"></i>
                  </button>
                </div>
              )}
              {room?.state === "OCCUPIED" && (
                <div className="card-footer d-flex justify-content-evenly">
                  <button className="btn btn-outline-light btn-sm "
                    onClick={() => handleCheckout(room.idBooking)}
                  >
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-outline-light btn-sm ">
                    <i className="fa fa-ban" aria-hidden="true"></i>
                  </button>
                </div>
              )}
              {room?.state === "DUE_OUT" && (
                <div className="card-footer d-flex justify-content-evenly">
                  <button className="btn btn-outline-light btn-sm "
                    onClick={() => handleCheckout(room.idBooking)}
                  >
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-outline-light btn-sm ">
                    <i className="fa fa-ban" aria-hidden="true"></i>
                  </button>
                </div>
              )}
              {room?.state === "OVERDUE" && (
                <div className="card-footer d-flex justify-content-evenly">
                  <button className="btn btn-outline-light btn-sm "
                    onClick={() => handleCheckout(room.idBooking)}
                  >
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-outline-light btn-sm ">
                    <i className="fa fa-ban" aria-hidden="true"></i>
                  </button>
                </div>
              )}
              {room?.state === "VACANT_DIRTY" && (
                <div className="card-footer d-flex justify-content-evenly">
                  <button className="btn btn-outline-light btn-sm "
                    onClick={() => handleClean(room.idBooking)}
                    >
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </button>
                  <button className="btn btn-outline-light btn-sm ">
                    <i className="fa fa-ban" aria-hidden="true"></i>
                  </button>
                </div>
              )}
              {room?.state === "CLEANING_IN_PROGRESS" && (
                <div className="card-footer d-flex justify-content-evenly">
                  <button className="btn btn-outline-light btn-sm "
                    onClick={() => handleCleanFinish(room.idBooking)}
                  >
                    <i className="fa fa-check" aria-hidden="true"></i>
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
      {showModal && <Modal closeModal={setShowModal}
        setChange={setChange}
        content={<RoomBillPayment />} width={'1200'}/>}
      {loading && <FullPageLoader />}
    </div>
  );
};

export default RoomDisplay;
