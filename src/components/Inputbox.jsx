import React from 'react';


const Inputbox = ({ label, name, value, onChange }) => {
  return (
    <div className='relative p-2 transition-transform duration-300 group rounded-lg'>
      <label className='font-semibold text-lg block mb-1'>{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className='border-b-2 border-customColor w-full focus:outline-none'
      />
    </div>
  );
};

export default Inputbox;
