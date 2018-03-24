import React, { Component } from 'react';
import styled from 'styled-components';

const RatingWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const RatingInput = styled.input`
  display: none;
`;

class Rating extends Component {
  render() {
    return (
      <RatingWrapper>
        <RatingInput id="5.0" type="radio" value="5.0" />
        <label htmlFor="5.0">Great</label>
        <RatingInput id="4.0" type="radio" value="4.0" />
        <label htmlFor="4.0">Good</label>
        <RatingInput id="3.0" type="radio" value="3.0" />
        <label htmlFor="3.0">Alright</label>
        <RatingInput id="2.0" type="radio" value="2.0" />
        <label htmlFor="2.0">Poor</label>
        <RatingInput id="1.0" type="radio" value="1.0" />
        <label htmlFor="1.0">Abysmal</label>
      </RatingWrapper>
    );
  }
}

export default Rating;
