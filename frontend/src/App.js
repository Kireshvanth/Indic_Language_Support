import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} >
          <Route index element={<HomeScreen />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;