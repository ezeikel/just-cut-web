import React from 'react';
import { NavLink } from 'react-router-dom'; // eslint-disable-line

import './Header.css';

const Header = () => (
  <header>
    <h1>Header works!</h1>
    {/* <nav>
      <ul>
        <li><NavLink to="/" exact>Home</NavLink></li>
        <li><NavLink to="/shops">Shops</NavLink></li>
        <li><NavLink to="/reviews">Reviews</NavLink></li>
      </ul>
      <ul>
        <li><NavLink to="/add-shop">Add Shop</NavLink></li>
      </ul>
    </nav> */}
  </header>
);

export default Header;
