import { Link } from 'react-router-dom';
import logo from '../../../asset/img/mer-de-nuit-hm-logo.png';

const Navbar = () => {
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
                </ul>

                <div className="col-md-3 text-end">
                    <Link to="/notification" className="me-2"><i className="fa fa-bell" aria-hidden="true"></i></Link>
                    <Link to="/booking/detail" className="me-4 position-relative">
                        <i className="fa fa-cart-plus" aria-hidden="true"></i>
                        <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </Link>
                    <Link to="/login" className="me-2 ">Login</Link>
                    | <Link to="/register" className="">Register</Link>
                </div>
            </header>
        </div>
    );
};

export default Navbar;