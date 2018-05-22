import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Rating from '../components/Rating/Rating';

describe('Rating Component', () => {
  it('renders without crashing', () => {
    shallow(<Rating />);
  });

  it('should match snapshot', () => {
    expect(shallowToJson(shallow(<Rating />))).toMatchSnapshot();
  });

  it('should render a form', () => {
    expect(mount(<Rating />).find('form').length).toEqual(1);
  });

  it('should render 5 inputs', () => {
    expect(mount(<Rating />).find('input').length).toEqual(5);
  });

  it('renders 5 labels', () => {
    expect(mount(<Rating />).find('label').length).toEqual(5);
  });

  it('renders total ratings if readonly is true', () => {
    expect(mount(<Rating readonly />).find('span').length).toEqual(1);
  });

  it('renders submit if no readonly prop is passed in', () => {
    expect(mount(<Rating />).find('button').length).toEqual(1);
  });

  it('doesnt render submit button if readonly is true', () => {
    expect(mount(<Rating readonly />).find('button').length).toEqual(0);
  });

  it('default to no ratings', () => {
    const wrapper = shallow(<Rating />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'totalRatings');
    expect(instance.totalRatings()).toEqual('No ratings yet.');

    // TODO: Test the component functions
  });
});
