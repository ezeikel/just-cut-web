import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Title = styled.h1`
  font-size: 2.5rem;
  color: palevioletred;
  text-transform: uppercase;
`;

const Header = () => (
  <header>
    <Link to="/"><Title>Just Cutt</Title></Link>
    <nav>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/help">Help</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
