import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDetail from './pages/DoctorDetail';
import MapLocationPicker from './pages/map';
import MainPage from './pages/MainPage';

const App = () => {
  // Assume searchResults is provided, for example, via props or state
  const searchResults = [
    // Sample data structure for doctors
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/doctor/:id" element={<DoctorDetail />} />
        <Route path="/map" element={< MapLocationPicker />} />
      </Routes>
    </Router>
  );
};

export default App;
