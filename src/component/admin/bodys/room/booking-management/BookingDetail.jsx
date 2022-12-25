import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PAYMENT_METHOD, PAYMENT_TYPE } from "src/constants/constants";
import { deleteById, findAll } from "src/redux/slice/booking-slice";
import FullPageLoader from "src/component/custom/FullPageLoader";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";


const BookingDetail = () => {
    const dispatch = useDispatch();
    const [progressInfo, setProgressInfo] = useState([]);
    const {bookingInfo, loading, error} = useSelector(state => ({...state.booking}));

    useEffect(() => {
        setProgressInfo(JSON.parse(bookingInfo?.order?.logs));
    }, [bookingInfo]);

    const handleDelete = (idBooking) => {
        dispatch(deleteById(idBooking))
            .then(res => {
                if (!res.error) {
                    toast.success('Xóa thành công');
                    dispatch(findAll());
                } else {
                    toast.error('Xóa thất bại');
                }
            })
    }

    return (
        <div className="vstack gap-3">
            <div className="hstack gap-3">
                <div className="vstack gap-3 w-50 border rounded p-3 bg-light">
                    <h3>BOOKING</h3>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <div>THỜI GIAN TẠO:</div>
                        <div>{moment(bookingInfo?.createdAt).format('DD/MM/YYYY HH:mm')}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>CẬP NHẬP GẦN NHẤT:</div>
                        <div>{moment(bookingInfo?.modifiedAt).format('DD/MM/YYYY HH:mm')}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>MÃ ĐẶT PHÒNG:</div>
                        <div>{bookingInfo?.id}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>NGÀY ĐẶT:</div>
                        <div>{moment(bookingInfo?.checkIn).format('DD/MM/YYYY HH:mm')}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>NGÀY TRẢ:</div>
                        <div>{moment(bookingInfo?.checkOut).format('DD/MM/YYYY HH:mm')}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>NGƯỜI LỚN:</div>
                        <div>{bookingInfo?.adultGuest}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>TRẺ EM:</div>
                        <div>{bookingInfo?.childGuest}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>TRẠNG THÁI:</div>
                        <div>
                            <span className="badge text-bg-success">
                                {bookingInfo?.state}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>GHI CHÚ:</div>
                        <div>{bookingInfo?.note}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>TÊN KHÁCH HÀNG:</div>
                        <div>{bookingInfo?.fullName}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>EMAIL:</div>
                        <div>{bookingInfo?.email}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>SỐ ĐIỆN THOẠI:</div>
                        <div>{bookingInfo?.phoneNumber}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>QUỐC TỊCH:</div>
                        <div>{bookingInfo?.country}</div>
                    </div>
                </div>
                <div className="vstack gap-3 w-50 border rounded p-3 bg-light">
                    <h3>ORDER</h3>
                    <hr/>
                    <div className="d-flex justify-content-between">
                        <div>THỜI GIAN TẠO:</div>
                        <div>{moment(bookingInfo?.order?.createdAt).format('DD/MM/YYYY HH:mm')}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>CẬP NHẬP GẦN NHẤT:</div>
                        <div>{moment(bookingInfo?.order?.modifiedAt).format('DD/MM/YYYY HH:mm')}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>MÃ HÓA ĐƠN:</div>
                        <div>{bookingInfo?.order?.id}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>TRẠNG THÁI:</div>
                        <div>
                            <span className="badge text-bg-success">
                                {bookingInfo?.order?.state}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>THƠI GIAN THANH TOÁN:</div>
                        <div>{moment(bookingInfo?.order?.paidAt).format('DD/MM/YYYY HH:mm')}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>HÌNH THỨC:</div>
                        <div>
                            <span className="badge text-bg-success">
                                {bookingInfo?.order.paymentType}
                            </span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>PHƯƠNG THỨC:</div>
                        <div>
                            {bookingInfo?.order.paymentType === PAYMENT_TYPE.POSTPAID ? 
                            (<select className="form-select form-select-lg mb-3 rounded-pill"
                                    id='paymentMethod' name='paymentMethod'>
                                <option value={PAYMENT_METHOD.CREDIT_CARDS}>CREDIT CARD</option>
                                <option value={PAYMENT_METHOD.CASH}>CASH</option>
                                <option value={PAYMENT_METHOD.CHECKS}>CHECKS</option>
                                <option value={PAYMENT_METHOD.DEBIT_CARDS}>DEBIT CARD</option>
                                <option value={PAYMENT_METHOD.ELECTRONIC_BANK_TRANFERS}>ELECTRON BANK TRANFERS</option>
                                <option value={PAYMENT_METHOD.MOBILE_PAYMENTS}>MOBILE PAYMENT</option>
                            </select>)
                            :
                            (<span className="badge text-bg-success">
                                {bookingInfo?.order?.paymentMethod}
                            </span>)}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>GHI CHÚ:</div>
                        <div>{bookingInfo?.order?.note}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>PHỤ PHÍ (%):</div>
                        <div>{bookingInfo?.order?.surcharge} %</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>TỔNG TIỀN:</div>
                        <div>$ {bookingInfo?.order?.grandTotal}</div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>SỐ TIỀN CẦN TRẢ:</div>
                        <div className="text-danger">$ {bookingInfo?.order?.debitTotal}</div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="border rounded p-3 bg-light">
                <h5 className="text-center">PHÒNG</h5>
                <table className="table table-secondary table-hover">
                    <thead>
                    <tr>
                        <th scope="col">HẠNG PHÒNG</th>
                        <th scope="col">SỐ LƯỢNG</th>
                        <th scope="col">GIÁ</th>
                        <th scope="col">SỐ PHÒNG</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingInfo?.roomTypeItems && bookingInfo?.roomTypeItems.map(item => (
                        <tr key={item?.id}>
                            <th scope="row">{item?.name}</th>
                            <td>x {item?.quantity}</td>
                            <td>$ {item?.price}</td>
                            <td>{item?.rooms.map(room => (
                                <span className="badge text-bg-success" key={room?.id}>
                                    {room?.roomName}
                                </span>
                            ))}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <hr/>
                <h5 className="text-center">DỊCH VỤ</h5>
                <table className="table table-secondary table-hover">
                    <thead>
                    <tr>
                        <th scope="col">TÊN DỊCH VỤ</th>
                        <th scope="col">SỐ LƯỢNG</th>
                        <th scope="col">GIÁ</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingInfo?.serviceItems && bookingInfo?.serviceItems.map(item => (
                        <tr key={item?.id}>
                            <th scope="row">{item?.name}</th>
                            <td>x {item?.quantity}</td>
                            <td>$ {item?.price}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <hr/>
                <h5 className="text-center">MÃ GIẢM GIÁ</h5>
                <table className="table table-secondary table-hover">
                    <thead>
                    <tr>
                        <th scope="col">MÃ QUÀ TẶNG</th>
                        <th scope="col">GIẢM</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookingInfo?.discountItems && bookingInfo?.discountItems.map(item => (
                        <tr key={item?.id}>
                            <th scope="row">{item?.giftCode}</th>
                            <td>{item?.percent} %</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <hr />
                <h5 className="text-center">TIẾN TRÌNH</h5>
                <table className="table table-secondary table-hover">
                    <thead>
                    <tr>
                        <th scope="col">THỜI GIAN</th>
                        <th scope="col">TRẠNG THÁI</th>
                        <th scope="col">NỘI DUNG</th>
                    </tr>
                    </thead>
                    <tbody>
                    {progressInfo && progressInfo?.map((item, i) => (
                        <tr key={i}>
                            <th scope="row">{item?.datetime}</th>
                            <td>
                                <span className="badge text-bg-success">
                                    {item?.state}
                                </span>
                            </td>
                            <td>{item?.message}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {!bookingInfo?.state.includes('CLOSE') ? (
                <>
                    <Link className="btn btn-outline-primary"
                        to={`/admin/booking-management/${bookingInfo?.id}/edit`}
                    >Chỉnh sửa</Link>
                </>
            ) : null}
            
            {loading && <FullPageLoader />}
        </div>
    )
}

export default BookingDetail;
