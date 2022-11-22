import { Outlet } from 'react-router-dom';
import './index.css';

const AuthLayout = () => {

    return (
        <>
            <div className='image'>
        </div>
            <Outlet />
        </>
    );

};

export default AuthLayout;