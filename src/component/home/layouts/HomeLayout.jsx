import {Outlet} from 'react-router-dom';
import Navbar from 'component/home/fragments/Navbar';
import Footer from 'component/home/fragments/Footer';
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
