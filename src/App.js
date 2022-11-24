import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
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
              </Route>

              <Route path="" element={<AuthLayout />}>
                <Route path="login" element={<Login />}></Route>
                <Route path="register" element={<Register />}></Route>
              </Route>


              <Route path="error" element={<ErrorLayout />}>
                <Route path="unauthorized" element={<Unauthorized />}></Route>
              </Route>

            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
