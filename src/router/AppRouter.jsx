import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@/feature/landingpage/index';
import ChartPage from '@/feature/idolchart/index';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/chart" element={<ChartPage />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
