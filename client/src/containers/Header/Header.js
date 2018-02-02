import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => (
  <header>
    <Link to="/"><h1>Just Cutt</h1></Link>
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/help">Help</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
