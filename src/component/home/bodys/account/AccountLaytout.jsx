import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const AccountLayout = () => {
    return (
        <div className="container">
            <ul className="nav nav-tabs ">
                <li className="nav-item">
                    <Link to={'/account/me'} className="nav-link" href="#">TÔI</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/account/draft'} className="nav-link" href="#">NHÁP</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/account/history'} className="nav-link" href="#">LỊCH SỬ</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/account/feedback'} className="nav-link" href="#">ĐÁNH GIÁ</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    )
};

export default AccountLayout;
