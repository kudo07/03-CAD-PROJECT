import React, { useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import MainApp from './MainApp';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />;
    </Routes>
  );
}
