import moment from "moment";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addOrUpdateDiscount, updateTimeBooking } from "../../../../../redux/slice/booking-slice";
import { findByGiftCode, isExpireByGiftCode } from "../../../../../redux/slice/discount-slice";
import FullPageLoader from "../../../../custom/FullPageLoader";
import Modal from "../../../../custom/Modal";
import RoomTypeOrderList from "../../../../home/bodys/booking-order/RoomTypeOrderList";
import ServiceOrderList from "../../../../home/bodys/booking-order/ServiceOrderList";

const BookingOfflineDetail = () => {

    const checkinRef = useRef();
    const checkoutRef = useRef();
    const adultRef = useRef();
    const childRef = useRef();
    const giftCodeRef = useRef();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [modeContentModal, setModeContentModal] = useState(0);
    const { loading } = useSelector(state => ({ ...state.roomtype }));
    const bookingReducer = useSelector(state => ({ ...state.booking }));
    const bookingRequest = bookingReducer.bookingRequest;


    const handleOpenModel = (title, modeContent) => {
        setTitleModal(title);
        setModeContentModal(modeContent);
        setOpenModal(true);
    }

    const handleUpdateTimeBooking = () => {
        let filterForm = {
            checkin: moment(checkinRef.current.value).format('YYYY-MM-DDT14:00:00'),
            checkout: moment(checkoutRef.current.value).format('YYYY-MM-DDT12:00:00'),
            adultGuest: adultRef.current.value || 1,
            childGuest: childRef.current.value || 0,
            idRoomType: ''
        };
        dispatch(updateTimeBooking(filterForm));
        toast.success('Đã cập nhập');
    }

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
    }

    return (
        <>
            <div className="v-stack gap-3 bg-light rounded p-3 border" style={{ width: '32%' }}>
                <h3>Chi tiết đặt phòng</h3>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                    <div>Ngày đặt</div>
                    <div>
                        <input className="form-control form-control-sm" type="date"
                            ref={checkinRef}
                            defaultValue={moment(new Date()).subtract(0, 'day').format('YYYY-MM-DD')}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <div>Ngày trả</div>
                    <div>
                        <input className="form-control form-control-sm" type="date"
                            ref={checkoutRef}
                            defaultValue={moment(new Date()).subtract(-1, 'day').format('YYYY-MM-DD')}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <div>Người lớn</div>
                    <div>
                        <input className="form-control form-control-sm" type="number"
                            ref={adultRef}
                            defaultValue={1} min="1" max={20}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <div>Trẻ em</div>
                    <div>
                        <input className="form-control form-control-sm" type="number"
                            ref={childRef}
                            defaultValue={0} min="0" max={20}
                        />
                    </div>
                </div>
                <button className="btn btn-sm btn-primary mb-3"
                    onClick={() => handleUpdateTimeBooking()}
                >Tra cứu</button>
                <br />
                <div className="v-stack gap-3">
                    <div className="d-flex justify-content-between">
                        <div>Hạng phòng:</div>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModel('HẠNG PHÒNG', 0)}>
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
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModel('DỊCH VỤ', 1)}>
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
                <hr />
                <div className="d-flex justify-content-between">
                    <div>Tiền phòng</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Tiền dịch vụ</div>
                    <div>$ 0</div>
                </div>
                <div className="v-stack gap-3">
                    <div>Mã giảm giá:</div>
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
                        <input type="text" ref={giftCodeRef} />
                        <button className="btn btn-sm btn-outline-dark"
                            onClick={() => handleAddDiscount()}
                        >Thêm</button>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <div>Tổng phụ</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Thuế dịch vụ</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Thuế VAT</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Tổng cộng</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Đặt cọc</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Số dư phải trả khi đến nơi</div>
                    <div>$ 0</div>
                </div>
            </div>
            {openModal && <Modal closeModal={setOpenModal} title={titleModal}
                content={modeContentModal ? 
                <ServiceOrderList closeModal={setOpenModal} /> : 
                <RoomTypeOrderList closeModal={setOpenModal} />} />}
            {loading && <FullPageLoader />}
        </>
    )

};

export default BookingOfflineDetail;