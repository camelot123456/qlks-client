import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import MainLayout from './component/MainLayout';
import HomeLayout from './component/home/layouts/HomeLayout';
import ErrorLayout from './component/error/layouts/ErrorLayout';
import AuthLayout from './component/auth/layouts/AuthLayout';
import HomePage from './component/home/bodys/home-page/HomePage';
import Unauthorized from './component/error/bodys/Unauthorized';
import Login from './component/auth/bodys/Login';
import Register from './component/auth/bodys/Register';

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

              <Route path="auth" element={<AuthLayout />}>
                <Route index path="login" element={<Login />}></Route>
                <Route index path="register" element={<Register />}></Route>
              </Route>

              <Route path="" element={<HomeLayout />}>
                <Route path="" element={<HomePage />}></Route>
                <Route path="home" element={<HomePage />}></Route>
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
