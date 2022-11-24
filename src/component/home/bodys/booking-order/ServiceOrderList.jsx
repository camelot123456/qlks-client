import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAll } from "../../../../redux/slice/service-slice";
import FullPageLoader from "../../../custom/FullPageLoader";

const ServiceOrderList = () => {

    const dispatch = useDispatch();
    const { services, loading, error } = useSelector(state => ({ ...state.service }));

    useEffect(() => {
        dispatch(findAll({
            page: 0,
            size: 20,
            sort: 'id,asc',
            search: ''
        }));
    }, []);

    return (
        <>
            {services && services.map(item => (
                <div key={item.id} className="card mb-3 mx-auto" style={{maxWidth: '540px'}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={item.thumbnail} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <h4 className="font-weight-light" style={{ color: '#d77b5d' }}>Giá: ${item.price}</h4>
                                <input type="number" min={0} max={50} defaultValue={0}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {loading && <FullPageLoader />}
        </>
    )
};

export default ServiceOrderList;