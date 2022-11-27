import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { findAll, findAllByUser } from '../../../../redux/slice/order-slice';
import FullPageLoader from '../../../custom/FullPageLoader';

const HistoryBooking = () => {

    const dispatch = useDispatch();
    const {orders, loading, error} = useSelector(state => ({ ...state.order}));

    useEffect(() => {
        dispatch(findAllByUser({
            page: 0,
            size: 20,
            sort: 'id,asc',
            search: ''
        }));
    }, []);

    return (
        <>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">TRẠNG THÁI</th>
                        <th scope="col">HÌNH THỨC</th>
                        <th scope="col">PHƯƠNG THỨC</th>
                        <th scope="col">THANH TOÁN</th>
                        <th scope="col">PHỤ PHÍ</th>
                        <th scope="col">TỔNG</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length && orders.map(item => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.state}</td>
                            <td>{item.paymentType}</td>
                            <td>{item.paymentMethod}</td>
                            <td>{item.paidAt || ''}</td>
                            <td>{item.surcharge}</td>
                            <td>{item.grandTotal}</td>
                            <td><button>XÓA</button></td>
                            <td><button>CHI TIẾT</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loading && <FullPageLoader />}
        </>
    )
};

export default HistoryBooking;