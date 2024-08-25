import React from 'react';
import companyLogo from '../assets/images/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-[#008480] text-white py-8 w-full">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <img src={companyLogo} alt="Company Logo" className="mx-auto md:mx-0 w-24 h-24 rounded-full mb-4 md:mb-0" />
            <p className="text-lg">Providing the best medical information and services.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:justify-end space-y-2 md:space-y-0 md:space-x-4">
            <a href="#" className="text-white hover:text-gray-200">Home</a>
            <a href="#" className="text-white hover:text-gray-200">About</a>
            <a href="#" className="text-white hover:text-gray-200">Services</a>
            <a href="#" className="text-white hover:text-gray-200">Contact</a>
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
