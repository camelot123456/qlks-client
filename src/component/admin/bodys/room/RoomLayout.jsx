import { Outlet } from "react-router"

const RoomLayout = () => {
    return (
        <>
            <h3>QUẢN LÝ PHÒNG</h3>
            <Outlet />
        </>
    )
};

export default RoomLayout;