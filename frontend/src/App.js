import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} >
        </Route>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;