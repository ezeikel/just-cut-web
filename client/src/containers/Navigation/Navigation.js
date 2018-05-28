import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const NavLinks = styled.ul`
  display: none;
  @media (min-width: 792px) {
    display: flex;
    li {
      padding: var(--spacing-medium);;
    }
    a {
      color: #var(--color-black);;
    }
  }
`;

const Navigation = () => (
  <nav>
    <NavLinks>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </NavLinks>
  </nav>
);

export default Navigation;
