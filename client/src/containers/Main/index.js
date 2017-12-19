import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddShop from '../../components/AddShop';
import Shops from '../Shops';
import Reviews from '../Reviews';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={AddShop} />
            <Route path='/shops' component={Shops} />
            <Route path='/reviews' component={Reviews} />
        </Switch>
    </main>
)

export default Main;
