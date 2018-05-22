import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import App from '../containers/App/App';
import Header from '../containers/Header/Header';
import Main from '../containers/Main/Main';

describe('App Component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('should match snapshot', () => {
    expect(shallowToJson(shallow(<App />))).toMatchSnapshot();
  });

  it('should render Header component', () => {
    expect(shallow(<App />).find(Header).exists()).toBe(true);
  });

  it('should render Main component', () => {
    expect(shallow(<App />).find(Main).exists()).toBe(true);
  });
});
