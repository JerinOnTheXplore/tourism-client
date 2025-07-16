import React from 'react';
import Login from '../pages/Login/Login';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const AuthLayout = () => {
    return (
        <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>    
        </div>
    );
};

export default AuthLayout;