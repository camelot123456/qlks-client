import { Outlet } from "react-router";
import Sidebar from "../fragments/Sidebar";
import Navbar from "../fragments/Navbar";

const AdminLayout = () => {
    return (
        <div className="hstack" style={{height: '100vh'}}>
            <Sidebar />
            <div className="vstack gap-3 px-3 overflow-auto">
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
};

export default AdminLayout;