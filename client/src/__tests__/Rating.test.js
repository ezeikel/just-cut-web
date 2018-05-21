import React from 'react';
import { shallow, mount } from 'enzyme';
import Rating from '../components/Rating/Rating';

describe('Rating Component', () => {
  // TODO: This test just seems to be passing
  it('should render without throwing an error', () => {
    expect(shallow(<Rating />).exists(<form />)).toBe(true);
  });

  it('renders five inputs', () => {
    expect(mount(<Rating />).find('input').length).toEqual(5);
  });

  it('renders five labels', () => {
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

  // TODO: Test to make sure this is working properly and commented out test below.
  // TODO: Add snapshot test
  it('default to no ratings', () => {
    const wrapper = shallow(<Rating />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'totalRatings');
    expect(instance.totalRatings()).toEqual('No ratings yet.');
  });

  // it('works out average rating', () => {
  //   const wrapper = shallow(<Rating />);
  //   const instance = wrapper.instance();
  //   jest.spyOn(instance, 'totalRatings');
  //   instance.calculateAverageRating([5, 5, 5]);
  //   //expect(wrapper.state().rating).to.equal(5);
  //   //expect(wrapper.state().foo).to.equal(10);
  //   // console.log(instance.totalRatings);
  //   expect(instance.totalRatings()).toEqual(5);
  // });
});
