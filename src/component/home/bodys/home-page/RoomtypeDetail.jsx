import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findById } from "src/redux/slice/roomtype-slice";
import { convertByPercent } from "src/util/util";
import FullPageLoader from "src/component/custom/FullPageLoader";
import RoomtypeSmallList from "./RoomtypeSmallList";
import { findAllByIdRoomtype, resetState } from "src/redux/slice/feedback-slice";

const RoomtypeDetail = () => {

    const { loading, error, roomtype } = useSelector(state => ({ ...state.roomtype }));
    const { feedbacks } = useSelector(state => ({ ...state.feedback }));
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        dispatch(resetState());
        dispatch(findById(id));
        dispatch(findAllByIdRoomtype(id));
        window.scrollTo(0, 0);
    }, [id]);

    const handleChangeTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <section>
                {roomtype.id && <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img className="card-img-top mb-5 mb-md-0" src={roomtype?.fileRepos[roomtype?.fileRepos?.length - 1]?.base64Image || roomtype.thumbnail} alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">SKU: {roomtype.id}</div>
                            <h1 className="display-5 fw-bolder">{roomtype.name}</h1>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through">{roomtype.discountPercent ? `$${roomtype.price}` : ''}</span>
                                <span>${convertByPercent(roomtype.price, roomtype.discountPercent)}</span>
                            </div>
                            <p className="lead">{roomtype.description}</p>
                        </div>
                    </div>
                </div>}
                {loading && <FullPageLoader />}
            </section>
            <div className="container">
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab ? 'active' : ''}`} aria-current="page" onClick={() => handleChangeTab(1)}>Ảnh</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab ? '' : 'active'}`} onClick={() => handleChangeTab(0)}>Đánh giá</button>
                    </li>
                </ul>
                {activeTab ? (
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {roomtype?.fileRepos && roomtype?.fileRepos.map((item, i) => (
                            <div key={i} class="col">
                                <div class="card">
                                    <img src={item?.base64Image} class="card-img-top" alt={roomtype.name}/>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ol className="list-group list-group p-1">
                        {feedbacks.length ? (
                            feedbacks.map(feedback => (
                                <li key={feedback.id} className="list-group-item d-flex justify-content-between align-items-start">
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{feedback?.customerName}</div>
                                        {feedback?.content}
                                    </div>
                                    <span className="badge bg-primary rounded-pill">
                                        {feedback?.rating} <i className="fa fa-star text-warning" aria-hidden="true"></i>
                                    </span>
                                </li>
                            ))
                        ) : (
                            <h3 className="text-center">Chưa có đánh giá</h3>
                        )}
                    </ol>
                )}
            </div>
            <RoomtypeSmallList title={'HẠNG PHÒNG KHÁC'} />
        </>
    )
};

export default RoomtypeDetail;
