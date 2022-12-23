import {Outlet} from 'react-router-dom';
import Navbar from 'src/component/home/fragments/Navbar';
import Footer from 'src/component/home/fragments/Footer';
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
