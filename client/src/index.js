import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import searchReducer from './store/reducers/search';
import shopReducer from './store/reducers/shop';
import shopsReducer from './store/reducers/shops';
import addShopReducer from './store/reducers/addShop';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  search: searchReducer,
  shop: shopReducer,
  shops: shopsReducer,
  addShop: addShopReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

render(app, document.querySelector('#root'));
registerServiceWorker();
