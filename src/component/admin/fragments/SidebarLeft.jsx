import { Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { useState } from "react";

const SidebarLeft = () => {
  const [openIcon, setOpenIcon] = useState(false);
  const { collapseSidebar } = useProSidebar();
  const handleCollapse = () => {
    collapseSidebar();
    setOpenIcon(prev => !prev);
  };
  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar defaultCollapsed>
        <Menu>
          <SubMenu
            label="QUẢN LÝ NHÂN SỰ"
            icon={<i className="fa fa-user" aria-hidden="true"></i>}
          >
            <MenuItem routerLink={<Link to="/documentation" />}>
              Quản lý tài khoản
            </MenuItem>
            <MenuItem routerLink={<Link to="/documentation" />}>
              Quản lý nhân viên
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="QUẢN LÝ PHÒNG"
            icon={<i className="fa fa-calendar" aria-hidden="true"></i>}
          >
            <MenuItem routerLink={<Link to="/admin/room/room-console" />}>
              Giám sát phòng
            </MenuItem>
            <MenuItem routerLink={<Link to="/admin/room/room-schedule" />}>
              Lịch trình phòng
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/admin/room/room-booking-request" />}
            >
              Yêu cầu đặt phòng
            </MenuItem>
          </SubMenu>
          <SubMenu
            label="QUẢN LÝ THỐNG KÊ"
            icon={<i className="fa fa-bar-chart" aria-hidden="true"></i>}
          >
            <MenuItem routerLink={<Link to="/admin/room/room-console" />}>
              Giám sát phòng
            </MenuItem>
            <MenuItem
              routerLink={<Link to="/admin/room/room-booking-request" />}
            >
              Yêu cầu đặt phòng
            </MenuItem>
          </SubMenu>
        </Menu>
        <main className="text-center">
          <button
            className="rounded-circle btn btn-secondary"
            onClick={() => handleCollapse()}
          >
            {openIcon ? (
              <i className="fa fa-chevron-right" aria-hidden="true"></i>
            ) : (
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            )}
          </button>
        </main>
      </Sidebar>
    </div>
  );
};

export default SidebarLeft;
