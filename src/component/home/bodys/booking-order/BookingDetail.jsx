import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FullPageLoader from "../../../custom/FullPageLoader";
import Modal from "../../../custom/Modal";
import RoomTypeOrderList from "./RoomTypeOrderList";
import ServiceOrderList from "./ServiceOrderList";

const BookingDetail = () => {

    const [openModal, setOpenModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [modeContentModal, setModeContentModal] = useState(0);
    const { loading, roomtypeSearch } = useSelector(state => ({ ...state.roomtype }));
    const bookingReducer = useSelector(state => ({ ...state.booking }));
    const bookingRequest = bookingReducer.bookingRequest;

    useEffect(() => {

    }, [loading, roomtypeSearch, bookingReducer]);

    const handleOpenModel = (title, modeContent) => {
        setTitleModal(title);
        setModeContentModal(modeContent);
        setOpenModal(true);
    }

    return (
        <>
            <div className="v-stack gap-3 bg-light rounded p-3 border" style={{ width: '32%' }}>
                <h3>Chi tiết đặt phòng</h3>
                <hr />
                <div className="d-flex justify-content-between">
                    <div>Ngày đặt</div>
                    <div>{bookingRequest.checkin || ''}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Ngày trả</div>
                    <div>{bookingRequest.checkout || ''}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Người lớn</div>
                    <div>{bookingRequest.adultGuest || 0}</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Trẻ em</div>
                    <div>{bookingRequest.childGuest || 0}</div>
                </div>
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
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
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
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
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
                    <div className="d-flex justify-content-between">
                        <input type="text" />
                        <button className="btn btn-sm btn-outline-dark">Thêm</button>
                    </div>
                    <table className="table table-hover">
                        <tbody>
                            {bookingRequest && bookingRequest.discountBookings.map(item => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.giftCode}</td>
                                    <td>{item.percent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                content={modeContentModal ? <ServiceOrderList /> : <RoomTypeOrderList />} />}
            {loading && <FullPageLoader />}
        </>
    )

};

export default BookingDetail;