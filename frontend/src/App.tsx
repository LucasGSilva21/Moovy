import React from 'react';

import './styles/global.css';

import Navbar from './components/Navbar';
import Routes from './routes'

function App() {
  return (
    <>
      <Navbar />
      <Routes />
    </>
  );
}

export default App;
