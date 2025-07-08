import React from 'react';
import { Outlet } from 'react-router';

const BasicLayout = () => {
    return (
        <div>
        <Outlet/>    
        </div>
    );
};

export default BasicLayout;