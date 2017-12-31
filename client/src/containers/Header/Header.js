import React from 'react';
import { NavLink } from 'react-router-dom'

import './Header.css';

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><NavLink to="/" exact>Home</NavLink></li>
                <li><NavLink to="/shops">Shops</NavLink></li>
                <li><NavLink to="/reviews">Reviews</NavLink></li>
            </ul>
            <ul>
                <li><NavLink to="/add-shop">Add Shop</NavLink></li>
            </ul>
        </nav>
    </header>
);

export default Header;
