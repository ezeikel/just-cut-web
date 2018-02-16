import React from 'react';
import styled from 'styled-components';

import Header from '../Header/Header';
import Main from '../Main/Main';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;
  padding: 16px;
`;

const App = () => (
  <Container>
    <Header />
    <Main />
  </Container>
);

export default App;
