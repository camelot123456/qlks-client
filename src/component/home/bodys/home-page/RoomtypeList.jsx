import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { findAll } from "src/redux/slice/roomtype-slice";
import FullPageLoader from "src/component/custom/FullPageLoader";

const RoomtypeList = () => {
    const dispatch = useDispatch();
    const { loading, roomtypes } = useSelector(state => ({ ...state.roomtype }));

    useEffect(() => {
        dispatch(findAll({
            page: 0,
            size: 100
        }));
    }, []);

    return (
        <div id="roomtype" className="container py-5" style={{marginTop: '64px'}}>
            <h1 className="text-center mt-5">Hạng phòng</h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {roomtypes && roomtypes.map(item => (
                    <div key={item.id} className="col">
                        <div className="card bg-light shadow">
                            <img src={item.fileRepos[item.fileRepos.length - 1]?.base64Image || item.thumbnail} 
                                className="card-img-top" alt={item.name} style={{maxHeight: '300px'}}/>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <h4 className="font-weight-light" style={{color: '#d77b5d'}}>Giá: {item.price}$/đêm</h4>
                                {/* <p className="card-text">Tình trạng: {item.countRoom ? `Còn ${item.countRoom} phòng` : 'Hết phòng'}</p>
                                <p className="font-weight-light card-text">Đánh giá: {item.rating} <i className="fa fa-star text-warning" aria-hidden="true"></i></p> */}
                                <Link className="btn btn-outline-dark" to={`/roomtype/${item.id}`}>Chi tiết</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {loading && <FullPageLoader />}
        </div>
    )

};

export default RoomtypeList;
