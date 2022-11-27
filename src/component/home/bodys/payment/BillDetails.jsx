import {useEffect} from "react";

const BillDetail = () => {

    useEffect(() => {
    }, []);

    return (
        <>
            <div className="vstack gap-3 text-center">
                <h1>GIAO DỊCH THÀNH CÔNG</h1>
                <p>Hóa đơn đặt phòng sẽ gửi qua Email của bạn, vui lòng kiểm tra Email</p>
                <h4>Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi</h4>
            </div>

        </>
    )
};

export default BillDetail;
