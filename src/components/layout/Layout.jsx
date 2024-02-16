// Layout.jsx
import React from 'react';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow bg-gray-100 p-4">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
