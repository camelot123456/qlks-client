import { Outlet } from 'react-router-dom';
import Navbar from '../fragments/Navbar';
import Footer from '../fragments/Footer';

const HomeLayout = () => {

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );

};

export default HomeLayout;