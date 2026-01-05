import React from 'react';
import Navbar from '../Components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer/Footer';

const MainLayouts = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-1">
        {/* use on product px-2 md:px-12 pt-8 */}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayouts;
