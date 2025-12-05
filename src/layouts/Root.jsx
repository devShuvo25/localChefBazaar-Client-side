import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen bg-[#FFF5F5] max-w-[1440px] mx-auto'>
            <Navbar/>
            <main className='flex-1 p-5 '>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
};

export default Root;