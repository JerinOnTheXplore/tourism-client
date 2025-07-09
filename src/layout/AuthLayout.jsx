import React from 'react';
import Login from '../pages/Login/Login';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const AuthLayout = () => {
    return (
        <div>
        <Navbar></Navbar>
        <Outlet></Outlet>    
        </div>
    );
};

export default AuthLayout;