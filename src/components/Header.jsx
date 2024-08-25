import React from 'react';
import companyLogo from '../assets/images/logo.jpg';

const Header = ({ label }) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between md:justify-start shadow-xl p-4 md:p-10'>
      <img 
        src={companyLogo} 
        alt="Company Logo" 
        className='w-24 h-24 md:w-32 md:h-32 rounded-xl mb-4 md:mb-0' 
      />
      <p className='text-center md:text-left font-light text-2xl md:text-3xl md:ml-10'>
        {label}
      </p>
    </div>
  );
}

export default Header;
