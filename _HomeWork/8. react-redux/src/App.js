import React from 'react';

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'

function App() {
  return (
    <div>
      <Navbar />
      <div className="container pt-4">
        <Home />
      </div>
    </div>
  )
}

export default App;
