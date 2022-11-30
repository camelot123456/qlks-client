import { Outlet } from "react-router";
import Navbar from "../fragments/Navbar";
import SidebarLeft from "../fragments/SidebarLeft";

const AdminLayout = () => {
    return (
        <div className="hstack" style={{height: '100vh'}}>
            <SidebarLeft />
            <div className="vstack gap-3 px-3 overflow-auto">
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
};

export default AdminLayout;