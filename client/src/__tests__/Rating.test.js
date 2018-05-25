import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Rating from '../components/Rating/Rating';

describe('Rating Component', () => {
  it('renders without crashing', () => {
    shallow(<Rating />);
  });

  it('should match snapshot', () => {
    expect(shallowToJson(shallow(<Rating />))).toMatchSnapshot();
  });

  it('should render a <RatingWrapper/>', () => {
    expect(shallow(<Rating />).find('RatingWrapper').length).toEqual(1);
  });

  it('should render five <RatingInput/>', () => {
    expect(shallow(<Rating />).find('RatingInput').length).toEqual(5);
  });

  it('should render five <RatingLabel/>', () => {
    expect(shallow(<Rating />).find('RatingLabel').length).toEqual(5);
  });

  it('should render <RatingTotal/> if readonly is true', () => {
    expect(shallow(<Rating readonly />).find('RatingTotal').length).toEqual(1);
  });

  it('should render <SubmitRating/> if no readonly is undefined', () => {
    expect(shallow(<Rating />).find('SubmitRating').length).toEqual(1);
  });

  it('should not render <SubmitRating/> if readonly is true', () => {
    expect(shallow(<Rating readonly />).find('SubmitRating').length).toEqual(0);
  });

  it('should default to no ratings', () => {
    const wrapper = shallow(<Rating />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'totalRatings');
    expect(instance.totalRatings()).toEqual('No ratings yet.');

    // TODO: Test the component functions
  });
});
