import { Outlet } from "react-router-dom";
import Navbar from "src/component/admin/fragments/Navbar";
import SidebarLeft from "src/component/admin/fragments/SidebarLeft";

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
