import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './../pages/Home/Home';
import Login from '../pages/Login/Login';
import Test from '../pages/Test/Test';
import NoPage from '../pages/NoPage/NoPage';
import routes from './routes';

import Customer from '../pages/Customer/Customer';

import MainLayout from '../layouts/Main';


const generateRoutes = (items: any) => {
  return items.map((item: any) => {
    return <Route key={item.path} path={item.path} element={item.element} />;
  });
};
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"
          // element={<Home />}
          element={<MainLayout />}
        >
          {generateRoutes(routes)}
          <Route path="/" element={<Customer />} />
        </Route>

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
