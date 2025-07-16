import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const BasicLayout = () => {
    return (
        <div>
        <Navbar></Navbar>
        <Outlet/>
        <Footer></Footer>    
        </div>
    );
};

export default BasicLayout;