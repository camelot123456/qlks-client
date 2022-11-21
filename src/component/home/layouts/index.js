import { Outlet } from 'react-router-dom';
import Navbar from '../fragments/navbar';
import Footer from '../fragments/footer';

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