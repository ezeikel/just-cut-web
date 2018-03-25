import React, { Component } from 'react';
import styled from 'styled-components';

import { spinKeyframe } from '../../globalStyles';
import starIcon from '../../assets/icons/star.svg';
import goldStarIcon from '../../assets/icons/gold-star.svg';

const RatingWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 35px);
`;

const RatingInput = styled.input`
  display: none;
`;

const RatingLabel = styled.label`
  background-image: url(${starIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  text-indent: -9999px;
  height: 25px;
  &.active {
    background-image: url(${goldStarIcon});
    animation: ${spinKeyframe} 0.3s ease-in-out;
  }
`;

class Rating extends Component {
  state = {
    rating: 0
  }

  updatRating = ({target}) => {
    this.setState({
      rating: target.id
    });
  }

  render() {
    return (
      <RatingWrapper>
        <RatingInput id="1" type="radio" value="1" onClick={this.updatRating} />
        <RatingLabel className={this.state.rating >= 1 ? 'active' : ''} htmlFor="1">Abysmal</RatingLabel>
        <RatingInput id="2" type="radio" value="2" onClick={this.updatRating} />
        <RatingLabel className={this.state.rating >= 2 ? 'active' : ''} htmlFor="2">Poor</RatingLabel>
        <RatingInput id="3" type="radio" value="3" onClick={this.updatRating} />
        <RatingLabel className={this.state.rating >= 3 ? 'active' : ''} htmlFor="3">Alright</RatingLabel>
        <RatingInput id="4" type="radio" value="4" onClick={this.updatRating} />
        <RatingLabel className={this.state.rating >= 4 ? 'active' : ''} htmlFor="4">Good</RatingLabel>
        <RatingInput id="5" type="radio" value="5" onClick={this.updatRating} />
        <RatingLabel className={this.state.rating >= 5 ? 'active' : ''} htmlFor="5">Great</RatingLabel>
      </RatingWrapper>
    );
  }
}

export default Rating;
