// src/App.js
import React from 'react';
import FacebookAuth from './components/FacebookAuth/FacebookAuth';
import {Routes, Route} from "react-router-dom"
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<FacebookAuth />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
}

export default App;
