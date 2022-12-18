import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'asset/img/mer-de-nuit-hm-logo.png';
import { getAccountMe, logout } from 'redux/slice/auth-slice';

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
        <div className="fixed-top bg-light w-100">
            <header className="container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3">
                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img className='w-25' src={logo} />
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
                    <li><Link to="/login" className="nav-link px-2 link-dark">Room</Link></li>
                    <li><Link to="/login" className="nav-link px-2 link-dark">Service</Link></li>
                    <li><Link to="/login" className="nav-link px-2 link-dark">About</Link></li>
                    <li><Link to="/login" className="nav-link px-2 link-dark">Constact</Link></li>
                    <li><Link to="/booking" className="btn btn-outline-success">Booking</Link></li>
                </ul>

                <div className="col-md-3 text-end">
                    {isLogin ?
                        (
                            <div className='d-flex justify-content-end'>
                                <Link to="/notification" className="me-2"><i className="fa fa-bell" aria-hidden="true"></i></Link>
                                <Link to="/booking/detail" className="me-4 position-relative">
                                    <i className="fa fa-cart-plus" aria-hidden="true"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                                        <span className="visually-hidden">New alerts</span>
                                    </span>
                                </Link>
                                <div className="dropdown text-end">
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
                        )
                        :
                        (
                            <div>
                                <Link to="/login" className="me-2 ">ĐĂNG NHẬP</Link> | <Link to="/register" className="">ĐĂNG KÝ</Link>
                            </div>
                        )
                    }
                </div>
            </header>
        </div>
    );
};

export default Navbar;