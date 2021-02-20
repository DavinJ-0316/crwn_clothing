import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import { Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Switch> 
        <Route  exact path="/" component={HomePage}/>
        <Route  path="/shop" component={ShopPage}/>
      </Switch>
      {/* Renders the first child <Route> or <Redirect> that matches the location. */}
    </div>
  );
}

export default App;
