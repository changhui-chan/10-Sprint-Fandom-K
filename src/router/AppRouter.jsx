import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/shared/layout';
import LandingPage from '@/pages/LandingPage';
import SupportPage from '../pages/support';
import CreateSupportPage from '../pages/createsupport';
import Mypage from '../pages/mypage';
import ChartPage from '../pages/chart';
import NotFoundPage from '../pages/not-found';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route element={<Layout />}>
          <Route path="/support" element={<SupportPage />}></Route>
          <Route path="/create-support" element={<CreateSupportPage />}></Route>
          <Route path="/mypage" element={<Mypage />}></Route>
          <Route path="/chart" element={<ChartPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
