import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAccountMe, logout } from "src/redux/slice/auth-slice";

const Navbar = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, accountMe, userInfo, isLogin } = useSelector(state => ({ ...state.auth }));

    useEffect(() => {
        dispatch(getAccountMe());
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="px-3 py-3 border-bottom mb-3">
            <div className="container d-flex flex-wrap justify-content-center">
                <form className="col-12 col-lg-auto mb-lg-0 me-lg-auto" role="search">
                    <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
                </form>

                <div className='d-flex justify-content-end align-items-center'>
                    {`${accountMe.firstName} ${accountMe.lastName}`}
                    <div className="dropdown text-end ms-3">
                        <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                        </a>
                        <ul className="dropdown-menu text-small">
                            <li><Link to="/account" className="dropdown-item">Tôi</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={() => handleLogout()}>Đăng xuất</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;
