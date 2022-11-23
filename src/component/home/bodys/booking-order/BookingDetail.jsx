import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FullPageLoader from "../../../custom/FullPageLoader";
import Modal from "../../../custom/Modal";

const BookingDetail = () => {

    const [openModal, setOpenModal] = useState(false);
    const { loading, roomtypeSearch } = useSelector(state => ({ ...state.roomtype }));

    useEffect(() => {

    }, [loading, roomtypeSearch]);
    console.log(openModal);
    return (
        <>
            <div className="v-stack gap-3 bg-light rounded p-3 border" style={{ width: '32%' }}>
                <h3>Chi tiết đặt phòng</h3>
                <hr />
                <div className="d-flex justify-content-between">
                    <div>Ngày đặt</div>
                    <div>12/12/22</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Ngày trả</div>
                    <div>12/12/22</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Người lớn</div>
                    <div>12/12/22</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Trẻ em</div>
                    <div>12/12/22</div>
                </div>
                <br />
                <div className="v-stack gap-3">
                    <div className="d-flex justify-content-between">
                        <div>Hạng phòng:</div>
                        <button className="btn btn-sm btn-outline-primary" onClick={() => setOpenModal(true)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="v-stack gap-3">
                    <div className="d-flex justify-content-between">
                        <div>Dịch vụ:</div>
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    </div>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <div>Tiền phòng</div>
                    <div>12/12/22</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Tiền dịch vụ</div>
                    <div>12/12/22</div>
                </div>
                <div className="v-stack gap-3">
                    <div>Mã giảm giá:</div>
                    <div className="d-flex justify-content-between">
                        <input type="text" />
                        <button className="btn btn-sm btn-outline-dark">Thêm</button>
                    </div>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <div>Tổng phụ</div>
                    <div>12/12/22</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Thuế dịch vụ</div>
                    <div>12/12/22</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Thuế VAT</div>
                    <div>12/12/22</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Tổng cộng</div>
                    <div>12/12/22</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Đặt cọc</div>
                    <div>12/12/22</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div>Số dư phải trả khi đến nơi</div>
                    <div>12/12/22</div>
                </div>
            </div>
            {openModal && <Modal closeModal={setOpenModal} />}
            {loading && <FullPageLoader />}
        </>
    )

};

export default BookingDetail;