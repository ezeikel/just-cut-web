import React from 'react';
import { shallow } from 'enzyme';
import App from '../containers/App/App';

// TODO: All these render tests dont work
it('renders without crashing', () => {
  expect(shallow(<App />).exists(<div />)).toBe(true);
});
