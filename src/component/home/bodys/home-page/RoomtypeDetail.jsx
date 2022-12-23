import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findById } from "src/redux/slice/roomtype-slice";
import { convertByPercent } from "src/util/util";
import FullPageLoader from "src/component/custom/FullPageLoader";
import RoomtypeSmallList from "./RoomtypeSmallList";

const RoomtypeDetail = () => {

    const { loading, error, roomtype } = useSelector(state => ({ ...state.roomtype }));
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(findById(id));
    }, [id]);

    return (
        <>
            <section className="py-5" style={{ marginTop: '100px' }}>
                {roomtype && <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img className="card-img-top mb-5 mb-md-0" src={roomtype.thumbnail} alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">SKU: {roomtype.id}</div>
                            <h1 className="display-5 fw-bolder">{roomtype.name}</h1>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through">{roomtype.discountPercent ? `$${roomtype.price}` : ''}</span>
                                <span>${convertByPercent(roomtype.price, roomtype.discountPercent)}</span>
                            </div>
                            <p className="lead">{roomtype.description}</p>
                            <div className="d-flex">
                                <input className="form-control text-center me-3" id="inputQuantity" type="num" value="1" style={{ maxWidth: '3rem' }} />
                                <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                    <i className="bi-cart-fill me-1"></i>
                                    Đặt ngay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}
                {loading && <FullPageLoader />}
            </section>
            <RoomtypeSmallList title={'HẠNG PHÒNG KHÁC'} />
        </>
    )
};

export default RoomtypeDetail;
