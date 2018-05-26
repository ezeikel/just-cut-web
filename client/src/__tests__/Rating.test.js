import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Rating from '../components/Rating/Rating';

describe('Rating Component', () => {
  it('should render without crashing', () => {
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

  it('totalRatings() should return "No ratings yet." by default', () => {
    const wrapper = shallow(<Rating />);
    const instance = wrapper.instance();
    expect(instance.totalRatings()).toEqual('No ratings yet.');
  });

  it('totalRatings() should be called once if readonly is true', () => {
    const wrapper = shallow(<Rating readonly />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'totalRatings');
    instance.forceUpdate();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });

  it('totalRatings() should not be called if readonly is undefined', () => {
    const wrapper = shallow(<Rating />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'totalRatings');
    instance.forceUpdate();
    expect(spy).toHaveBeenCalledTimes(0);
    spy.mockClear();
  });

  it('renderRating() should be called once', () => {
    const wrapper = shallow(<Rating />);
    const instance = wrapper.instance();
    const spy = jest.spyOn(instance, 'renderRating');
    instance.forceUpdate();
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });

  it('should have three active stars based off ratings props passed in', () => {
    const wrapper = shallow(<Rating readonly ratings={[5, 5, 5, 5, 5, 1, 1, 1, 1, 1]} />);
    expect(wrapper.find('RatingLabel').at(0).hasClass('active')).toEqual(true);
    expect(wrapper.find('RatingLabel').at(1).hasClass('active')).toEqual(true);
    expect(wrapper.find('RatingLabel').at(2).hasClass('active')).toEqual(true);
  });
});
