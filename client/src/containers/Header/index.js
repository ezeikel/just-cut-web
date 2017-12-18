import React from 'react';
import { Link } from 'react-router-dom'

import './Header.css';

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shops">Shops</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
            </ul>
        </nav>
    </header>
)

export default Header;
