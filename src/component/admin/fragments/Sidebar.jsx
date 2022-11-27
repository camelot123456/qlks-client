import { Link } from 'react-router-dom';
import logo from '../../../asset/img/mer-de-nuit-hm-logo.png';

const Sidebar = () => {
    return (
        <div className="flex-shrink-0 p-3 bg-dark shadow bg-body h-100 al" style={{ width: '280px' }}>
            <div className=''>
                <a href="/" className="d-flex align-items-center pb-1 mb-3 link-dark text-decoration-none border-bottom">
                    <img className='w-25' src={logo} />
                </a>
                <ul className="list-unstyled ps-0">
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                            QUẢN LÝ NHÂN VIÊN
                        </button>
                        <div className="collapse" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Overview</a></li>
                                <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Updates</a></li>
                                <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Reports</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            QUẢN LÝ PHÒNG
                        </button>
                        <div className="collapse" id="dashboard-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to={'/admin/room/room-console'} className="link-dark d-inline-flex text-decoration-none rounded">Giám sát phòng</Link></li>
                                <li><Link to={'/admin/room/room-booking-request'} className="link-dark d-inline-flex text-decoration-none rounded">Yêu cầu đặt phòng</Link></li>
                                <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Quản lý phòng</a></li>
                                <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Quản lý buồng phòng</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                            QUẢN LÝ THỐNG KÊ
                        </button>
                        <div className="collapse" id="orders-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">New</a></li>
                                <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Processed</a></li>
                                <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Shipped</a></li>
                                <li><a href="#" className="link-dark d-inline-flex text-decoration-none rounded">Returned</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>

        </div>
    )
};

export default Sidebar;