import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Niveis from './pages/Niveis';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="niveis" element={<Niveis />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Routers;