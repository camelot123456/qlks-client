import HeaderSlice from "./HeaderSlide";
import React from "react";
import RoomtypeList from "./RoomtypeList";
import ServiceList from "./ServiceList";

const HomePage = () => {

    return (
        <>
            <HeaderSlice />
            <RoomtypeList />
            <ServiceList title={'DỊCH VỤ'} />
        </>
    )
};

export default HomePage;