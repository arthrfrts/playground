import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './assets/css/base/base.css';
import Home from './paginas/Home';
import Sobre from './paginas/Sobre';
import Pagina404 from './paginas/Pagina404';
import Header from './components/Header';
import Post from './components/Post';
import Category from './paginas/Category';

function App() {
  return (
    <Router>
      <Header />
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/sobre">
          <Sobre />
        </Route>
        <Route path="/categoria/:id">
          <Category />
        </Route>
        <Route path="/post/:id">
          <Post />
        </Route>
        <Route>
          <Pagina404 />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
