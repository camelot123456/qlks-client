import moment from "moment";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {addOrUpdateDiscount, resetState} from "src/redux/slice/booking-slice";
import {findByGiftCode, isExpireByGiftCode, resetDiscountBookings} from "src/redux/slice/discount-slice";
import FullPageLoader from "src/component/custom/FullPageLoader";
import Modal from "src/component/custom/Modal";
import RoomTypeOrderList from "./RoomTypeOrderList";
import ServiceOrderList from "./ServiceOrderList";
import { resetRoomtypeBookings } from "src/redux/slice/roomtype-slice";
import { resetServiceBooking } from "src/redux/slice/service-slice";

const BookingDetail = () => {

    const giftCodeRef = useRef();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [roomSurchagre, setRoomSurchagre] = useState(0);
    const [serviceSurchagre, setServiceSurchagre] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [discountPercentTotal, setDiscountPercentTotal] = useState(0);
    const [changeBookingState, setChangeBookingState] = useState({});
    const [modeContentModal, setModeContentModal] = useState(0);
    const {loading} = useSelector(state => ({...state.roomtype}));
    const bookingReducer = useSelector(state => ({...state.booking}));
    const bookingRequest = bookingReducer.bookingRequest;
    const temporaryBooking = bookingReducer.temporaryBooking;

    useEffect(() => {
        setRoomSurchagre(getRoomSurchagre());
        setServiceSurchagre(getServiceSurchagre());
        setDiscountPercentTotal(getDiscountPercentTotal());
        setGrandTotal(getGrandTotal());
    }, [
        bookingRequest?.roomTypeBookings,
        bookingRequest?.serviceBookings,
        bookingRequest?.discountBookings
    ]);

    useEffect(() => {
        dispatch(resetServiceBooking());
        dispatch(resetDiscountBookings());
        // dispatch(resetRoomtypeBookings());
        // dispatch(resetState());
    }, []);

    const handleOpenModel = (title, modeContent) => {
        setTitleModal(title);
        setModeContentModal(modeContent);
        setOpenModal(true);
    };

    const handleAddDiscount = () => {
        const giftCode = giftCodeRef.current.value;
        Promise.all([
            dispatch(isExpireByGiftCode(giftCode)),
            dispatch(findByGiftCode(giftCode))
        ])
            .then(([expireRes, giftCodeInfo]) => {
                if (expireRes.payload) {
                    dispatch(addOrUpdateDiscount({
                        isExpireGiftCode: expireRes.payload,
                        giftCode: giftCodeInfo.payload.giftCode,
                        name: giftCodeInfo.payload.name,
                        percent: giftCodeInfo.payload.percent,
                        description: giftCodeInfo.payload.description
                    }));
                    toast.success('Added gift code');
                    giftCodeRef.current.value = '';
                } else {
                    toast.error('The gift code was be expired or not found');
                }
            });
    };

    const getRoomSurchagre = () => {
        return bookingRequest?.roomTypeBookings?.reduce((subTotal, element) => {
            return subTotal + element?.price * element?.quantity;
        }, 0);
    }

    const getServiceSurchagre = () => {
        return bookingRequest?.serviceBookings?.reduce((subTotal, element) => {
            return subTotal + element?.price * element?.quantity;
        }, 0);
    }

    const getDiscountPercentTotal = () => {
        return bookingRequest?.discountBookings?.reduce((subTotal, element) => {
            return subTotal + element?.percent;
        }, 0);
    }

    const getGrandTotal = () => {
        return getServiceSurchagre() + (getRoomSurchagre() * (100 - getDiscountPercentTotal()) / 100);
    }

    return (
        <>
            <div className="v-stack gap-3 bg-light rounded p-3 border" style={{width: '32%'}}>
                <h3>Chi tiết đặt phòng</h3>
                <hr/>
                <div className="d-flex justify-content-between">
                    <div>Ngày đặt</div>
                    <div>{moment(bookingRequest.checkin).format('DD/MM/YYYY HH:mm') || ''}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Ngày trả</div>
                    <div>{moment(bookingRequest.checkout).format('DD/MM/YYYY HH:mm') || ''}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Người lớn</div>
                    <div>{bookingRequest.adultGuest || 0}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Trẻ em</div>
                    <div>{bookingRequest.childGuest || 0}</div>
                </div>
                <br/>
                <div className="v-stack gap-3">
                    <div className="d-flex justify-content-between">
                        <div>Hạng phòng:</div>
                        <button className="btn btn-sm btn-outline-primary"
                                onClick={() => handleOpenModel('HẠNG PHÒNG', 0)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <table className="table table-hover">
                        <tbody>
                        {bookingRequest && bookingRequest.roomTypeBookings.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{item.name}</th>
                                <td>X {item.quantity}</td>
                                <td>$ {item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="v-stack gap-3">
                    <div className="d-flex justify-content-between">
                        <div>Dịch vụ:</div>
                        <button className="btn btn-sm btn-outline-primary"
                                onClick={() => handleOpenModel('DỊCH VỤ', 1)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <table className="table table-hover">
                        <tbody>
                        {bookingRequest && bookingRequest.serviceBookings.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{item.name}</th>
                                <td>X {item.quantity}</td>
                                <td>$ {item.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <hr/>
                <div className="d-flex justify-content-between">
                    <div>Tiền phòng</div>
                    <div>$ {Number((roomSurchagre).toFixed(2))}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Tiền dịch vụ</div>
                    <div>$ {Number((serviceSurchagre).toFixed(2))}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Mã giảm giá:</div>
                    <div>{Number((discountPercentTotal).toFixed(2))}%</div>
                </div>
                <div className="v-stack gap-3">
                    <table className="table table-hover">
                        <tbody>
                        {bookingRequest && bookingRequest.discountBookings.map(item => (
                            <tr key={item.giftCode} title={`${item.name}-${item.description}`}>
                                <th scope="row">{item.giftCode}</th>
                                <td>Giảm {item.percent}%</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between">
                        <input type="text" ref={giftCodeRef}/>
                        <button className="btn btn-sm btn-outline-dark"
                                onClick={() => handleAddDiscount()}
                        >Thêm
                        </button>
                    </div>
                </div>
                <hr/>
                <div className="d-flex justify-content-between">
                    <div>Tổng phụ phí</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Tổng cộng</div>
                    <div>$ {Number((grandTotal).toFixed(2))}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Số dư phải trả khi đến nơi</div>
                    <div>$ {Number((grandTotal).toFixed(2))}</div>
                </div>
            </div>
            {openModal && <Modal closeModal={setOpenModal} title={titleModal}
                                 content={modeContentModal ?
                                     <ServiceOrderList closeModal={setOpenModal}/> :
                                     <RoomTypeOrderList closeModal={setOpenModal}/>}/>}
            {loading && <FullPageLoader/>}
        </>
    )

};

export default BookingDetail;
