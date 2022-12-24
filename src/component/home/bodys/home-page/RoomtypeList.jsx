import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addRoomIntoCart, findAll } from "src/redux/slice/roomtype-slice";
import FullPageLoader from "src/component/custom/FullPageLoader";

const RoomtypeList = () => {
    const dispatch = useDispatch();
    const { loading, roomtypes } = useSelector(state => ({ ...state.roomtype }));

    useEffect(() => {
        dispatch(findAll({
            page: 0,
            size: 100
        }))
    }, []);

    return (
        <div className="container">
            {roomtypes && roomtypes.map(item => (
                <div key={item.id} className="row gx-4 gx-lg-5 align-items-center my-5">
                    <div className="col-lg-7">
                        <img className="img-fluid rounded mb-4 mb-lg-0" 
                            src={item.fileRepos[item.fileRepos.length - 1].base64Image} alt="..." />
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">{item.name}</h1>
                        <h4 className="font-weight-light" style={{color: '#d77b5d'}}>Giá: {item.price}$/đêm</h4>
                        <p className="font-weight-light">Tình trạng: {item.countRoom ? `Còn ${item.countRoom} phòng` : 'Hết phòng'}</p>
                        <p className="font-weight-light">Đánh giá: {item.rating} <i className="fa fa-star" aria-hidden="true"></i></p>
                        <p>{item.description}</p>
                        <Link className="btn btn-outline-dark" to={`/roomtype/${item.id}`}>Chi tiết</Link>
                    </div>
                </div>
            ))}
            {loading && <FullPageLoader />}
        </div>
    )

};

export default RoomtypeList;
