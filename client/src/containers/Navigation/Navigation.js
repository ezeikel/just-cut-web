import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const NavLinks = styled.ul`
  display: none;
  @media (min-width: 792px) {
    display: flex;
    li {
      padding: 16px;
    }
    a {
      color: #000;
    }
  }
`;

const Navigation = () => (
  <nav>
    <NavLinks>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/help">Help</Link></li>
    </NavLinks>
  </nav>
);

export default Navigation;
