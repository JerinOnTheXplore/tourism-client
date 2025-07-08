import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const BasicLayout = () => {
    return (
        <div>
        <Navbar></Navbar>
        <Outlet/>    
        </div>
    );
};

export default BasicLayout;