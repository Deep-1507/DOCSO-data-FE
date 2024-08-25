import React from 'react';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-responsive-carousel/lib/js/components/Carousel'; // Ensure you install react-responsive-carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import companyLogo from '../assets/images/logo.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IoCall } from "react-icons/io5";


const DoctorDetail = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;

  if (!doctor) {
    return <p>Doctor not found!</p>;
  }

  return (
    <div>
 <Header label={`Here are the details of ${doctor.DrName}.`}/>
    <div className="flex flex-col md:flex-row p-8 bg-gray-100 min-h-screen">
      
      {/* Firm Images Section */}
      <div className="w-full md:w-1/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Firm Images</h2>
        {Array.isArray(doctor.Firm_Images) && doctor.Firm_Images.length > 0 ? (
          <Carousel 
            showThumbs={false} 
            autoPlay 
            infiniteLoop 
            dynamicHeight 
            className="rounded-lg shadow-lg"
          >
            {doctor.Firm_Images.map((img, index) => (
              <div key={index} className="flex justify-center items-center h-full">
                <img 
                  src={img.img_thumb} 
                  alt={img.label} 
                  className="object-contain w-full h-auto rounded-lg"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-gray-500">No firm images available</p>
        )}
      </div>

      {/* Doctor Details Section */}
      <div className="w-full md:w-2/3 p-4">
      <div className='flex'>
      <h1 className="text-4xl font-extrabold mb-6 ">{doctor.DrName}</h1>  
      {doctor.PhoneNumber && (
              <a
                href={`tel:${doctor.PhoneNumber}`}
                className=" flex items-center  bg-[#008480] relative bottom-4 left-5 text-white px-6 py-3 rounded-lg mt-4 hover:bg-[#005f58] transition-colors duration-300"
              >
               
                <IoCall />
               &nbsp; &nbsp;
                {doctor.PhoneNumber}
              </a>
            )}
      </div>
      
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <p className="text-gray-700 text-lg"><strong>Firm Name:</strong> {doctor.FirmName}</p>
          <p className="text-gray-700 text-lg"><strong>City:</strong> {doctor.city}</p>
          <p className="text-gray-700 text-lg"><strong>Email:</strong> {doctor.email}</p>
          <p className="text-gray-700 text-lg"><strong>Phone:</strong> {doctor.PhoneNumber}</p>
          <p className="text-gray-700 text-lg"><strong>Year of Establishment:</strong> {doctor.YOEstablishment}</p>
          <p className="text-gray-700 text-lg"><strong>Total Reviews on JD:</strong> {doctor.totJdReviews}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <p className="text-gray-700 text-lg"><strong>Full Address:</strong></p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Building: {doctor.building}</li>
            <li>Street: {doctor.street}</li>
            <li>Area: {doctor.area}</li>
            <li>Address Line: {doctor.addressln}</li>
            <li>Pincode: {doctor.pincode}</li>
            <li>City: {doctor.city}</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-700 text-lg"><strong>Qualification:</strong> {doctor.qualification}</p>
          <p className="text-gray-700 text-lg"><strong>Awards:</strong> {doctor.award_certificate}</p>
          <p className="text-gray-700 text-lg"><strong>Categories:</strong> {doctor.categories.join(', ')}</p>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default DoctorDetail;
