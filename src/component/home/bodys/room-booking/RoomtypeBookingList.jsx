import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrUpdateRoomtype } from "redux/slice/booking-slice";
import { saveRoomtypeTemp } from "redux/slice/roomtype-slice";
import FullPageLoader from "component/custom/FullPageLoader";

const RoomtypeBookingList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const roomtypeReducer = useSelector(state => ({ ...state.roomtype }));
    const bookingReducer = useSelector(state => ({ ...state.booking }));
    const roomTypeBookings = roomtypeReducer.roomtypeBookings;

    useEffect(() => {
    }, [roomtypeReducer.loading, 
        roomtypeReducer.roomtypeSearch,
        bookingReducer.bookingRequest
    ]);

    const handleSaveRoomtypeTemp = (id, name, quantity, countRoom, price) => {
        dispatch(saveRoomtypeTemp({id, name, quantity, countRoom, price}));
    }

    const handleSaveRoomtypesOption = () => {
        dispatch(addOrUpdateRoomtype({roomTypeBookings}));
        navigate('/booking/detail')
    }

    return (
        <div className="container">
            {roomtypeReducer.roomtypeSearch && roomtypeReducer.roomtypeSearch.map(item => (
                <div key={item.id} className="row gx-4 gx-lg-5 align-items-center my-5">
                    <div className="col-lg-7">
                        <img className="img-fluid rounded mb-4 mb-lg-0" width={'600px'} src={item.thumbnail} alt="..." />
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">{item.name}</h1>
                        <h4 className="font-weight-light" style={{ color: '#d77b5d' }}>Giá: {item.price}$/đêm</h4>
                        <p className="font-weight-light">Tình trạng: {item.countRoom ? `Còn ${item.countRoom} phòng` : 'Hết phòng'}</p>
                        <p className="font-weight-light">Đánh giá: {item.rating} <i className="fa fa-star" aria-hidden="true"></i></p>
                        <p>{item.description}</p>
                        <div className="row g-3 align-items-center">
                            <div className="col-auto">
                                <label htmlFor={item.id} className="form-label">Số lượng phòng</label>
                            </div>
                            <div className="col-auto">
                                <input type="number" className="form-control" id={item.id} defaultValue={0}
                                    min={0} max={item.countRoom}
                                    onChange={(e) => handleSaveRoomtypeTemp(item.id, item.name, +e.target.value, item.countRoom, item.price)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {roomtypeReducer.roomtypeSearch.length > 0 && <div className="d-flex flex-row-reverse">
                <button className="btn btn-primary ms-3"
                    onClick={() => handleSaveRoomtypesOption()}>Booking</button>
                <button className="btn btn-primary">Cancel</button>
            </div>}
            {roomtypeReducer.loading && <FullPageLoader />}
        </div>
    )

};

export default RoomtypeBookingList;