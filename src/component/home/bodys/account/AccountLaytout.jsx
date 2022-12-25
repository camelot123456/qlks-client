import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { resetState } from "src/redux/slice/feedback-slice";

const AccountLayout = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        dispatch(resetState());
    }, []);

    const handleChangeTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <ul className="nav nav-tabs ">
                <li className="nav-item" onClick={() => handleChangeTab(0)}>
                    <Link to={'/account/me'} 
                    className={`nav-link ${activeTab === 0 ? 'active' : ''}`} href="#">TÔI</Link>
                </li>
                {/* <li className="nav-item" onClick={() => handleChangeTab(1)}>
                    <Link to={'/account/draft'} 
                    className={`nav-link ${activeTab === 1 ? 'active' : ''}`} href="#">NHÁP</Link>
                </li> */}
                <li className="nav-item" onClick={() => handleChangeTab(2)}>
                    <Link to={'/account/history'} 
                    className={`nav-link ${activeTab === 2 ? 'active' : ''}`} href="#">LỊCH SỬ</Link>
                </li>
                <li className="nav-item" onClick={() => handleChangeTab(3)}>
                    <Link to={'/account/feedback'} 
                    className={`nav-link ${activeTab === 3 ? 'active' : ''}`} href="#">ĐÁNH GIÁ</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    )
};

export default AccountLayout;
