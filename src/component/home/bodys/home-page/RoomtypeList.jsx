import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addRoomIntoCart } from "redux/slice/roomtype-slice";
import FullPageLoader from "component/custom/FullPageLoader";

const RoomtypeList = () => {

    const { loading, roomtypeSearch } = useSelector(state => ({ ...state.roomtype }));

    useEffect(() => {

    }, [loading, roomtypeSearch]);

    const handleAddRoomIntoCart = (idRoomtype) => {
        const res = addRoomIntoCart(idRoomtype);
        if(res) {
            toast.success('Đã thêm vào danh sách');
        } else toast.error('Thêm thất bại');;
    };

    return (
        <div className="container">
            {roomtypeSearch && roomtypeSearch.map(item => (
                <div key={item.id} className="row gx-4 gx-lg-5 align-items-center my-5">
                    <div className="col-lg-7">
                        <img className="img-fluid rounded mb-4 mb-lg-0" src={item.thumbnail} alt="..." />
                    </div>
                    <div className="col-lg-5">
                        <h1 className="font-weight-light">{item.name}</h1>
                        <h4 className="font-weight-light" style={{color: '#d77b5d'}}>Giá: {item.price}$/đêm</h4>
                        <p className="font-weight-light">Tình trạng: {item.countRoom ? `Còn ${item.countRoom} phòng` : 'Hết phòng'}</p>
                        <p className="font-weight-light">Đánh giá: {item.rating} <i className="fa fa-star" aria-hidden="true"></i></p>
                        <p>{item.description}</p>
                        <button className="btn btn-outline-primary me-3" onClick={() => handleAddRoomIntoCart(item.id)}>Đặt ngay</button>
                        <button className="btn btn-outline-info me-3" onClick={() => handleAddRoomIntoCart(item.id)}>Lưu</button>
                        <Link className="btn btn-outline-dark" to={`/roomtype/${item.id}`}>Chi tiết</Link>
                    </div>
                </div>
            ))}
            {loading && <FullPageLoader />}
        </div>
    )

};

export default RoomtypeList;