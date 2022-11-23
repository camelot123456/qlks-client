import { Link } from 'react-router-dom';
import logo from '../../../asset/img/mer-de-nuit-hm-logo.png';

const Navbar = () => {
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <img className='w-25' src={logo}/>
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="#" className="nav-link px-2 link-secondary">Home</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Features</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">Pricing</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">FAQs</a></li>
                    <li><a href="#" className="nav-link px-2 link-dark">About</a></li>
                </ul>

                <div className="col-md-3 text-end">
                    <Link to="/auth/login" className="btn btn-outline-primary me-2">Login</Link>
                    <Link to="/auth/register" className="btn btn-primary">Register</Link>
                </div>
            </header>
        </div>
    );
};

export default Navbar;