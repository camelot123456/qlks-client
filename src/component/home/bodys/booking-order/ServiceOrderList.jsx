import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addOrUpdateService } from "../../../../redux/slice/booking-slice";
import { findAll, saveServiceTemp } from "../../../../redux/slice/service-slice";
import FullPageLoader from "../../../custom/FullPageLoader";

const ServiceOrderList = ({closeModal}) => {

    const dispatch = useDispatch();
    const quantityRef = useRef();
    const { services, loading, error, serviceBookings } = useSelector(state => ({ ...state.service }));
    const bookingReducer = useSelector(state => ({ ...state.booking }));
    const serviceBookingOrders = bookingReducer.bookingRequest.serviceBookings;

    useEffect(() => {
        dispatch(findAll({
            page: 0,
            size: 20,
            sort: 'id,asc',
            search: ''
        }));
    }, []);

    const getQuantityByIdService = (idService) => {
        const serviceBookings = serviceBookingOrders.find(rtb => rtb.id === idService);
        return serviceBookings && serviceBookings.quantity || 0;
    }

    const handleSaveServiceTemp = (id, name, quantity, price) => {
        dispatch(saveServiceTemp({id, name, quantity, price}));
    }

    const handleSaveServicesOption = () => {
        dispatch(addOrUpdateService({serviceBookings}));
        closeModal(false);
        toast.success('Saved');
    }

    return (
        <>
            {services && services.map(item => (
                <div key={item.id} className="d-flex position-relative p-3 border mb-3 bg-light shadow-lg bg-body rounded">
                    <img src={item.thumbnail} width="30%" className="flex-shrink-0 me-3" alt="..." />
                    <div>
                        <h5 className="mt-0">{item.name}</h5>
                        <h4 className="font-weight-light" style={{ color: '#d77b5d' }}>Giá: ${item.price}</h4>
                        <input type="number" min={0} max={20} id={item.id} ref={quantityRef}
                            defaultValue={getQuantityByIdService(item.id)} 
                            onChange={(e) => handleSaveServiceTemp(item.id, item.name, +e.target.value, item.price)}/>
                    </div>
                </div>
            ))}
            <div className="d-flex flex-row-reverse">
                <button type="button" className="btn btn-outline-success"
                    onClick={() => handleSaveServicesOption()}>Lưu</button>
            </div>
            {loading && <FullPageLoader />}
        </>
    )
};

export default ServiceOrderList;
