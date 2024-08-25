import React from 'react';
import companyLogo from '../assets/images/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-[#008480] text-white py-8 w-full">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center ">
          
            <img src={companyLogo} alt="" className="text-2xl font-bold" />
            <p className="text-lg">Providing the best medical information and services.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-end">
            <a href="#" className="text-white hover:text-gray-200 mx-2 mb-2 md:mb-0">Home</a>
            <a href="#" className="text-white hover:text-gray-200 mx-2 mb-2 md:mb-0">About</a>
            <a href="#" className="text-white hover:text-gray-200 mx-2 mb-2 md:mb-0">Services</a>
            <a href="#" className="text-white hover:text-gray-200 mx-2 mb-2 md:mb-0">Contact</a>
          </div>
        </div>
        <div className="text-center mt-6 border-t border-gray-200 pt-4">
          <p>&copy; {new Date().getFullYear()} DOCSO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
