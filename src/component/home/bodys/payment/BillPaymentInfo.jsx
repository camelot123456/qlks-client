import Modal from "../../../custom/Modal";
import ServiceOrderList from "../booking-order/ServiceOrderList";
import RoomTypeOrderList from "../booking-order/RoomTypeOrderList";
import FullPageLoader from "../../../custom/FullPageLoader";

const BillPaymentInfo = () => {
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

export default BillPaymentInfo;
