import {Outlet} from 'react-router-dom';
import Navbar from '../fragments/Navbar';
import Footer from '../fragments/Footer';
import React from "react";

const HomeLayout = () => {

    return (
        <>
            <Navbar/>
            <div style={{marginTop: '100px'}}>
                <Outlet/>
            </div>
            <Footer/>
        </>
    );

};

export default HomeLayout;
