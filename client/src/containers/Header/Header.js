import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Navigation from '../Navigation/Navigation';

const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-white);
  color: var(--color-black);;
  h1 {
    color: var(--color-black);
    text-align: center;
  }
  @media (min-width: 792px) {
    display: flex;
  grid-template-columns: 300px 1fr;
  }
`;

const Title = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-size: 42px;
  letter-spacing: -2px;
`;

const Header = () => (
  <Wrapper>
    <Link to="/"><Title>Just Cutt.</Title></Link>
    <Navigation />
  </Wrapper>
);

export default Header;
