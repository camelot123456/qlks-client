import moment from "moment";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addOrUpdateDiscount } from "../../../../redux/slice/booking-slice";
import { findByGiftCode, isExpireByGiftCode } from "../../../../redux/slice/discount-slice";
import FullPageLoader from "../../../custom/FullPageLoader";
import Modal from "../../../custom/Modal";
import RoomTypeOrderList from "./RoomTypeOrderList";
import ServiceOrderList from "./ServiceOrderList";

const BookingDetail = () => {

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
                <h3>Chi ti???t ?????t ph??ng</h3>
                <hr />
                <div className="d-flex justify-content-between">
                    <div>Ng??y ?????t</div>
                    <div>{moment(bookingRequest.checkin).format('DD/MM/YYYY HH:mm') || ''}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Ng??y tr???</div>
                    <div>{moment(bookingRequest.checkout).format('DD/MM/YYYY HH:mm') || ''}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Ng?????i l???n</div>
                    <div>{bookingRequest.adultGuest || 0}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Tr??? em</div>
                    <div>{bookingRequest.childGuest || 0}</div>
                </div>
                <br />
                <div className="v-stack gap-3">
                    <div className="d-flex justify-content-between">
                        <div>H???ng ph??ng:</div>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModel('H???NG PH??NG', 0)}>
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
                        <div>D???ch v???:</div>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModel('D???CH V???', 1)}>
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
                    <div>Ti???n ph??ng</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Ti???n d???ch v???</div>
                    <div>$ 0</div>
                </div>
                <div className="v-stack gap-3">
                    <div>M?? gi???m gi??:</div>
                    <table className="table table-hover">
                        <tbody>
                            {bookingRequest && bookingRequest.discountBookings.map(item => (
                                <tr key={item.giftCode} title={`${item.name}-${item.description}`}>
                                    <th scope="row">{item.giftCode}</th>
                                    <td>Gi???m {item.percent}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between">
                        <input type="text" ref={giftCodeRef} />
                        <button className="btn btn-sm btn-outline-dark"
                            onClick={() => handleAddDiscount()}
                        >Th??m</button>
                    </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <div>T???ng ph???</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Thu??? d???ch v???</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Thu??? VAT</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>T???ng c???ng</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>?????t c???c</div>
                    <div>$ 0</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>S??? d?? ph???i tr??? khi ?????n n??i</div>
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

export default BookingDetail;