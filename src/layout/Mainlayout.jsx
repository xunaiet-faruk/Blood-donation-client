import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Fotter from '../shared/Fotter';

const Mainlayout = () => {
    return (
        <div className='container mx-auto'>
            <Navbar/>
            <Outlet/>
            <Fotter/>
        </div>
    );
};

export default Mainlayout;