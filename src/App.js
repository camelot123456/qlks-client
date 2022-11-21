import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import MainLayout from './component';
import HomeLayout from './component/home/layouts';
import ErrorLayout from './component/error/layouts';
import AuthLayout from './component/auth/layouts';
import HomePage from './component/home/bodys/home-page/index';
import Unauthorized from './component/error/bodys/unauthorized';
import Login from './component/auth/bodys/login';
import Register from './component/auth/bodys/register';

function App() {
  return (
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
  );
}

export default App;
