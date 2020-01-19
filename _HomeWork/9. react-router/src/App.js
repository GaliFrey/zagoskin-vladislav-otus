import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import About from './components/About/About'
import Home from './components/Home/Home'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container pt-4">
        <Switch>
          <Route exact path={'/'}>
            <Home />
          </Route>
          <Route path={'/about'}>
            <About />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
