import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Home from './components/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container pt-4">
          <Route exact path={'/'} component={Home} />
          <Route path={'/cities/:key'} component={About} />
      </div>
    </BrowserRouter>
  )
}

export default App;
