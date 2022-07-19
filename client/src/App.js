import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

export default function App() {

  //null => 아무나 출입 가능한 페이지
  //true => 로그인한 유저만 출입 가능한 페이지
  //false => 로그인한 유저는 출입 불가능한 페이지
  const AuthLandingPage  = Auth(LandingPage, null);
  const AuthLoginPage  = Auth(LoginPage, false);
  const AuthRegisterPage  = Auth(RegisterPage, false);
  

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={AuthLandingPage} />
          <Route exact path="/login" element={AuthLoginPage} />
          <Route exact path="/register" element={AuthRegisterPage} />
        </Routes>
    </Router>
  );
}