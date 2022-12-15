import { Link } from "react-router-dom";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import React, { useState } from "react";

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
          <MenuItem routerLink={<Link to="/admin/dashboard" />} 
            icon={<i className="fa fa-tachometer" aria-hidden="true"></i>}
          >
            Dashboard
          </MenuItem>
          <SubMenu
            label="QUẢN LÝ PHÒNG"
            icon={<i className="fa fa-calendar" aria-hidden="true"></i>}
          >
            <MenuItem routerLink={<Link to="/admin/room/room-booking-offline" />}>
              Đặt phòng
            </MenuItem>
            <MenuItem routerLink={<Link to="/admin/booking-management" />}>
              Quản lý booking
            </MenuItem>
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
            <MenuItem routerLink={<Link to="/admin/statistic" />}>
              Thống kê doanh thu
            </MenuItem>
            <MenuItem routerLink={<Link to="/admin/payment-log" />}>
              Danh sách thống kê
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
