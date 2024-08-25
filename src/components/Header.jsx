import React from 'react'
import companyLogo from '../assets/images/logo.jpg';

const Header = ({label}) => {
  return (
<div className='flex items-center shadow-xl'>
        <img 
         src={companyLogo} alt="Company Logo" 
         className='ml-10 my-10 rounded-xl' />
        <p className='ml-10 my-10 font-light text-3xl'>
         {label}
        </p>
      </div>
  )
}

export default Header