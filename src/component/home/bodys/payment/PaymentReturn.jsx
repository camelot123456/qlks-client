import {TOKEN_PAYPAL} from "../../../../constants/constants";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {captureOrderPaypal} from "../../../../redux/slice/payment-slice";
import FullPageLoader from "../../../custom/FullPageLoader";
import {useNavigate, useSearchParams} from "react-router-dom";

const PaymentReturn = () => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        handlePayment();
    }, []);

    const handlePayment = () => {
        const token = searchParams.get(TOKEN_PAYPAL);
        dispatch(captureOrderPaypal(token))
            .then(() => {
                navigate('/bill/detail');
            });
    };

    return (
        <>
            <h3>HÓA ĐƠN ĐANG XỬ LÝ ....</h3>
            <FullPageLoader/>
        </>
    )
};

export default PaymentReturn;
