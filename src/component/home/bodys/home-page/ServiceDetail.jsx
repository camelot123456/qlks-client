import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findById } from "src/redux/slice/service-slice";
import { convertByPercent } from "src/util/util";
import FullPageLoader from "src/component/custom/FullPageLoader";
import ServiceList from "./ServiceList";

const ServiceDetail = () => {

    const { loading, error, service } = useSelector(state => ({ ...state.service }));
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(findById(id));
    }, [id]);

    return (
        <>
            <section className="py-5" style={{ marginTop: '100px' }}>
                {service && <div className="container px-4 px-lg-5 my-5">
                    <div className="row gx-4 gx-lg-5 align-items-center">
                        <div className="col-md-6">
                            <img className="card-img-top mb-5 mb-md-0" src={service.thumbnail} alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="small mb-1">SKU: {service.id}</div>
                            <h1 className="display-5 fw-bolder">{service.name}</h1>
                            <div className="fs-5 mb-5">
                                <span className="text-decoration-line-through">{service.discountPercent ? `$${service.price}` : ''}</span>
                                <span>${convertByPercent(service.price, service.discountPercent)}</span>
                            </div>
                            <p className="lead">{service.description}</p>
                        </div>
                    </div>
                </div>}
                {loading && <FullPageLoader />}
            </section>
            <ServiceList title={'DỊCH VỤ KHÁC'}/>
        </>
    )
};

export default ServiceDetail;
