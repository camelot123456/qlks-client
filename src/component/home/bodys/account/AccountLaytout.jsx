import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const AccountLayout = () => {
    return (
        <div className="container">
            <ul class="nav nav-tabs ">
                <li class="nav-item">
                    <Link to={'/account/me'} class="nav-link active" href="#">TÔI</Link>
                </li>
                <li class="nav-item">
                    <Link to={'/account/draft'} class="nav-link" href="#">NHÁP</Link>
                </li>
                <li class="nav-item">
                    <Link to={'/account/history'} class="nav-link" href="#">LỊCH SỬ</Link>
                </li>
                <li class="nav-item">
                    <Link to={'/account/feedback'} class="nav-link" href="#">ĐÁNH GIÁ</Link>
                </li>
            </ul>
            <Outlet />
        </div>
    )
};

export default AccountLayout;