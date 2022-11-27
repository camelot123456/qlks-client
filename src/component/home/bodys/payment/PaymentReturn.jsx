import {TOKEN_PAYPAL} from "../../../../constants/constants";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import FullPageLoader from "../../../custom/FullPageLoader";
import {useNavigate, useSearchParams} from "react-router-dom";
import { billPayment } from "../../../../redux/slice/order-slice";

const PaymentReturn = () => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get(TOKEN_PAYPAL);
        dispatch(billPayment(token))
            .then(() => {
                navigate('/bill/detail');
            });
    }, []);

    return (
        <div style={{height: '100%'}}>
            <h3 className="mx-auto">HÓA ĐƠN ĐANG XỬ LÝ ....</h3>
            <FullPageLoader/>
        </div>
    )
};

export default PaymentReturn;
