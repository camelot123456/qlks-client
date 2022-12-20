import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ROLES } from './constants/authority';
import MainLayout from './component/MainLayout';
import HomeLayout from './component/home/layouts/HomeLayout';
import ErrorLayout from './component/error/layouts/ErrorLayout';
import AuthLayout from './component/auth/layouts/AuthLayout';
import Unauthorized from './component/error/bodys/Unauthorized';
import Login from './component/auth/bodys/Login';
import Register from './component/auth/bodys/Register';
import RoomtypeDetail from './component/home/bodys/home-page/RoomtypeDetail';
import ServiceDetail from './component/home/bodys/home-page/ServiceDetail';
import BookingLayout from './component/home/bodys/booking-order/BookingLayout';
import RoomBookingLayout from './component/home/bodys/room-booking/RoomBookingLayout';
import HomePageLayout from './component/home/bodys/home-page/HomePageLayout';
import NotFound from './component/error/bodys/NotFound';
import PaymentReturn from "./component/home/bodys/payment/PaymentReturn";
import BillDetail from "./component/home/bodys/payment/BillDetails";
import AccountLayout from "./component/home/bodys/account/AccountLaytout";
import AccountMe from './component/home/bodys/account/AccounMe';
import DraftBooking from './component/home/bodys/account/DraftBooking';
import HistoryBooking from './component/home/bodys/account/HistoryBooking';
import Feedback from './component/home/bodys/account/Feedback';
import RequireAuth from './component/protected/RequireAuth';
import AdminLayout from './component/admin/layouts/AdminLayout';
import RoomLayout from './component/admin/bodys/room/RoomLayout';
import RoomConsoleLayout from './component/admin/bodys/room/room-console/RoomConsoleLayout';
import RoomBookingRequest from './component/admin/bodys/room/room-booking/RoomBookingRequest';
import HistoryDetail from "./component/home/bodys/account/HistoryDetail";
import StatisticLayout from './component/admin/bodys/statistic/StatisticLayout';
import BookingOffineLayout from './component/admin/bodys/room/booking-offline/BookingOffileLayout';
import BookingList from './component/admin/bodys/room/booking-management/BookingList';
import FeedbackDetail from 'component/home/bodys/account/FeedbackDetail';

// https://preview.themeforest.net/item/triper-creative-tour-travel-hotel-booking-agency-react-template/full_screen_preview/25335777?_ga=2.46860001.75497068.1669143948-1579485344.1669043010
function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Suspense
          fallback={
            <div className="App">
              <h1>Loading...</h1>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<HomeLayout />}>
                <Route path="" element={<HomePageLayout />}></Route>
                <Route path="home" element={<HomePageLayout />}></Route>
                <Route path="roomtype/:id" element={<RoomtypeDetail />}></Route>
                <Route path="service/:id" element={<ServiceDetail />}></Route>
                <Route path="booking" element={<RoomBookingLayout />}></Route>
                <Route path="booking/detail" element={<BookingLayout />}></Route>
                <Route path="payment/return" element={<PaymentReturn />}></Route>
                <Route path="bill/detail" element={<BillDetail />}></Route>
                <Route element={
                  <RequireAuth allowedRoles={[ROLES.USER, ROLES.ADMIN]} />}
                >
                  <Route path="account" element={<AccountLayout />}>
                    <Route path="me" element={<AccountMe />} />
                    <Route path="history" element={<HistoryBooking />} />
                    <Route path="draft" element={<DraftBooking />} />
                    <Route path="feedback" element={<Feedback />} />
                    <Route path="feedback/:id/detail" element={<FeedbackDetail />} />
                  </Route>
                </Route>
              </Route>

              <Route path="" element={<AuthLayout />}>
                <Route path="login" element={<Login />}></Route>
                <Route path="register" element={<Register />}></Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={[
                ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.HOUSEKEEPING, ROLES.HR, ROLES.RECEPTIONIST, ROLES.SERVICE
              ]}/>}>
                <Route path="admin" element={<AdminLayout />}>
                  <Route path="room" element={<RoomLayout />}>
                    <Route path="room-console" element={<RoomConsoleLayout />}/>
                    <Route path="room-booking-request" element={<RoomBookingRequest />}/>
                    <Route path="room-booking-offline" element={<BookingOffineLayout />}/>
                  </Route>
                  <Route path="booking-management" element={<BookingList />}/>
                  <Route path="statistic" element={<StatisticLayout />}>
                      
                  </Route>
                </Route>
              </Route>


              <Route path="" element={<ErrorLayout />}>
                <Route path="unauthorized" element={<Unauthorized />}></Route>
              </Route>

              <Route path="*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
