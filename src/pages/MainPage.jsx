import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Inputbox from '../components/Inputbox';
import Header from '../components/Header';
import Footer from '../components/Footer';
import companyLogo from '../assets/images/logo.jpg';
import '../App.css';
import '../style.css';

function MainPage() {
  const [formData, setFormData] = useState({
    DrName: '',
    FirmName: '',
    email: '',
    city: '',
    categories: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultCount, setResultCount] = useState(0);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    // Fetch unique categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://docso-data-be.vercel.app/categories');
        // Sort the categoriesList in ascending order
        const sortedCategories = response.data.sort((a, b) => a.localeCompare(b));
        setCategoriesList(sortedCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResultCount(0);

    const categoriesArray = formData.categories.split(',').map(cat => cat.trim()).filter(cat => cat !== '');

    try {
      const response = await axios.post('https://docso-data-be.vercel.app/search', {
        ...formData,
        categories: categoriesArray,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSearchResults(response.data);
      setResultCount(response.data.length);
    } catch (err) {
      console.error('Error:', err.response ? err.response.data : err.message);
      setError('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header label={"Kindly provide the details below to access comprehensive information about doctors."}/>

      <div className='p-4 md:p-10'>
        <form onSubmit={handleSubmit} className='flex flex-col md:flex-row md:flex-wrap justify-between space-y-4 md:space-y-0'>
          <div className="w-full md:w-[48%]">
            <Inputbox
              label="Doctor Name:"
              name="DrName"
              value={formData.DrName}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-[48%]">
            <Inputbox
              label="Firm Name:"
              name="FirmName"
              value={formData.FirmName}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-[48%]">
            <Inputbox
              label="Email:"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-[48%]">
            <Inputbox
              label="City:"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full md:w-[48%]">
            <div className='relative p-2 transition-transform duration-300 group rounded-lg'>
              <label htmlFor="categories" className='font-semibold text-lg block mb-1'>Categories</label>
              <select
                id="categories"
                name="categories"
                value={formData.categories}
                onChange={handleInputChange}
                className='border-b-2 border-customColor w-full focus:outline-none'
              >
                <option value="">Select a category</option>
                {categoriesList.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full flex justify-center md:justify-start">
            <button
              type="submit"
              disabled={loading}
              className='bg-customColor hover:bg-[#4bd7d2] mx-2 px-10 py-2 my-4 shadow-xl text-white font-light text-2xl rounded-lg'
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className='py-4 bg-customColor text-center mt-10 text-white text-xl rounded-xl'>
          <h3>Search Results:</h3>
          {resultCount > 0 && (
            <p>Found <strong>{resultCount}</strong> doctor{resultCount > 1 && 's'}.</p>
          )}
        </div>

        <div className='pt-8'>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((doctor) => {
              if (!doctor.PhoneNumber && !doctor.email) {
                return null;
              }

              return (
                <Link
                  to={`/doctor/${doctor._id}`}
                  state={{ doctor }}
                  key={doctor._id}
                  className="bg-white p-4 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl block"
                >
                  <strong className="text-xl">{doctor.DrName}</strong>
                  <p className="text-gray-600">{doctor.FirmName} ({doctor.city})</p>
                  <p className="mt-2">Email: {doctor.email}</p>
                  <p className="mt-2">Phone: {doctor.PhoneNumber}</p>
                  <p className="mt-2">Categories: {doctor.categories.join(', ')}</p>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default MainPage;
