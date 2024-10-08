import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@/pages/LandingPage';
import SupportPage from '../pages/support';
import CreateSupportPage from '../pages/createsupport';
import Mypage from '../pages/mypage';
import ChartPage from '../pages/chart';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/support" element={<SupportPage />}></Route>
        <Route path="/create-support" element={<CreateSupportPage />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/chart" element={<ChartPage />}></Route>
        <Route path="*" element={<div>Not Found</div>}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
