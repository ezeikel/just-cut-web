import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Shops from '../../components/Shops/Shops';
import AddShop from '../../components/AddShop/AddShop';
import Shop from '../../components/Shops/Shop/Shop';
import Register from '../Register/Register';
import Login from '../Login/Login';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/shops" component={Shops} />
      <Route path="/shop/:slug" component={Shop} />
      <Route path="/add-shop" component={AddShop} />
    </Switch>
  </main>
);

export default Main;
