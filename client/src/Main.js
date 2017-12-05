import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Shops from './Shops';
import Reviews from './Reviews';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/shops' component={Shops} />
            <Route path='/reviews' component={Reviews} />
        </Switch>
    </main>
)

export default Main;
