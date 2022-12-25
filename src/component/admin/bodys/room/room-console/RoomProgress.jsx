import {useSelector} from "react-redux";
import React from "react";
import FullPageLoader from "src/component/custom/FullPageLoader";
import moment from "moment";
import { useState } from "react";
import { useEffect } from "react";

const RoomProgress = ({setChange, closeModal}) => {
    const [progressInfo, setProgressInfo] = useState([]);
    const {bookingInfo, loading} = useSelector(state => ({...state.booking}));

    useEffect(() => {
        setProgressInfo(JSON.parse(bookingInfo?.order?.logs));
    }, [bookingInfo]);

    return (
        <div className="vstack gap-3">
            <h5 className="text-center">TIẾN TRÌNH</h5>
            <table className="table table-secondary table-hover">
                <thead>
                <tr>
                    <th scope="col">THỜI GIAN</th>
                    <th scope="col">TRẠNG THÁI</th>
                    <th scope="col">NỘI DUNG</th>
                </tr>
                </thead>
                <tbody>
                {progressInfo && progressInfo?.map((item, i) => (
                    <tr key={i}>
                        <th scope="row">{item?.datetime}</th>
                        <td>
                            <span className="badge text-bg-success">
                                {item?.state}
                            </span>
                        </td>
                        <td>{item?.message}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {loading && <FullPageLoader/>}
        </div>
    )
};
export default RoomProgress;
