import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorDetail from './pages/DoctorDetail';
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
      </Routes>
    </Router>
  );
};

export default App;
