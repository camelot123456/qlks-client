import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { findAll } from "../../../../redux/slice/roomtype-slice";
import FullPageLoader from "../../../custom/FullPageLoader";

const RoomtypeSmallList = ({title}) => {

    const { loading, error, roomtypes } = useSelector(state => ({ ...state.roomtype }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findAll({
            page: 0,
            size: 3,
            sort: 'id,asc',
            search: ''
        }));
    }, []);

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <h1 className="text-center mb-4">{title}</h1>
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {roomtypes && roomtypes.map(item => (
                        <div key={item.id} className="col mb-5">
                            <div className="card h-100">
                                <img className="card-img-top" src={item.thumbnail} />
                                <div className="card-body p-4">
                                    <div className="text-center">
                                        <h5 className="fw-bolder">{item.name}</h5>
                                        <p style={{ color: '#d77b5d' }}>${item.price}</p>
                                    </div>
                                </div>
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <Link to={`/roomtype/${item.id}`} className="btn btn-outline-dark mt-auto">Chi tiết</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {loading && <FullPageLoader />}
        </section>
    )
};

export default RoomtypeSmallList;