import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Shops from '../../components/Shops/Shops';
import Reviews from '../Reviews/Reviews';
import AddShop from '../../components/AddShop/AddShop';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/shops" component={Shops} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/add-shop" component={AddShop} />
    </Switch>
  </main>
);

export default Main;
