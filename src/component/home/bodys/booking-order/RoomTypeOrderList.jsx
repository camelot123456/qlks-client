import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addOrUpdateRoomtype } from "redux/slice/booking-slice";
import { findAll, roomtypeFilter, saveRoomtypeTemp } from "redux/slice/roomtype-slice";
import FullPageLoader from "component/custom/FullPageLoader";

const RoomTypeOrderList = ({closeModal}) => {

    const dispatch = useDispatch();
    const roomtypeReducer = useSelector(state => ({ ...state.roomtype }));
    const bookingReducer = useSelector(state => ({ ...state.booking }));
    const roomtypeBookings = bookingReducer.bookingRequest.roomTypeBookings;
    const roomtypes = roomtypeReducer.roomtypes;
    const roomtypeSearch = roomtypeReducer.roomtypeSearch;

    useEffect(() => {
        dispatch(findAll({
            page: 0,
            size: 20,
            sort: 'id,asc',
            search: ''
        }));
    }, []);

    useEffect(() => {
        dispatch(roomtypeFilter({
            checkin: bookingReducer.bookingRequest.checkin,
            checkout: bookingReducer.bookingRequest.checkout,
            adultGuest: bookingReducer.bookingRequest.adultGuest,
            childGuest: bookingReducer.bookingRequest.childGuest
        }));
    }, []);

    const getCountRoomByIdRoomType = (idRoomType) => {
        const roomtypeSearchItem = roomtypeSearch.find(rts => rts.id === idRoomType);
        return roomtypeSearchItem && roomtypeSearchItem.countRoom;
    };

    const getQuantityByIdRoomType = (idRoomType) => {
        const roomtypeBooking = roomtypeBookings.find(rtb => rtb.id === idRoomType);
        return roomtypeBooking && roomtypeBooking.quantity || 0;
    };

    const handleSaveRoomtypeTemp = (id, name, quantity, countRoom, price) => {
        dispatch(saveRoomtypeTemp({id, name, quantity, countRoom, price}));
    };

    const handleSaveRoomtypesOption = () => {
        const roomTypeBookings = roomtypeReducer.roomtypeBookings;
        dispatch(addOrUpdateRoomtype({roomTypeBookings}));
        closeModal(false);
        toast.success('Saved');
    };

    return (
        <>
            {roomtypes && roomtypes.map((item, index) => (
                <div key={index} className="d-flex position-relative p-3 border mb-3 bg-light shadow-lg bg-body rounded">
                    <img src={item.thumbnail} width="50%" className="flex-shrink-0 me-3" alt="..." />
                    <div>
                        <h5 className="mt-0">{item.name}</h5>
                        <p className="font-weight-light">Tình trạng: {getCountRoomByIdRoomType(item.id) ? `Còn ${getCountRoomByIdRoomType(item.id)} phòng` : 'Hết phòng'}</p>
                        <h4 className="font-weight-light" style={{ color: '#d77b5d' }}>Giá: ${item.price}</h4>
                        <input type="number" min={0} max={getCountRoomByIdRoomType(item.id) || 20}
                            defaultValue={getQuantityByIdRoomType(item.id)} 
                            onChange={(e) => handleSaveRoomtypeTemp(item.id, item.name, +e.target.value, item.countRoom, item.price)}/>
                    </div>
                </div>
            ))}
            <div className="d-flex flex-row-reverse">
                <button type="button" className="btn btn-outline-success"
                    onClick={() => handleSaveRoomtypesOption()}>Lưu</button>
            </div>
            {roomtypeReducer.loading && <FullPageLoader />}
        </>
    )
};

export default RoomTypeOrderList;
