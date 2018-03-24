import React, { Component } from 'react';
import styled from 'styled-components';

import starIcon from '../../assets/icons/star.svg';
import goldStarIcon from '../../assets/icons/gold-star.svg';

const RatingWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const RatingInput = styled.input`
  display: none;
  &.active + label {
    background-image: url(${goldStarIcon});
  }
`;

const RatingLabel = styled.label`
  background-image: url(${starIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  text-indent: -9999px;
  //width: 35px;
  height: 25px;
`;

class Rating extends Component {
  state = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  }

  updatRating = ({target}) => {
    console.log({target});
    // TODO: Do this via state change instead where all previous stars are also made active
    target.classList.add('active');

    // const noSelected = target.id;
    // const changes = 5 - noSelected;
    // this.setState
    // for (const i = 0; i < noSelected; i++) {
    //   this.setState({

    //   })
    // }
  }

  render() {
    return (
      <RatingWrapper>
        <RatingInput id="5" type="radio" value="5" onClick={this.updatRating} />
        <RatingLabel htmlFor="5">Great</RatingLabel>
        <RatingInput id="4" type="radio" value="4" onClick={this.updatRating} />
        <RatingLabel htmlFor="4">Good</RatingLabel>
        <RatingInput id="3" type="radio" value="3" onClick={this.updatRating} />
        <RatingLabel htmlFor="3">Alright</RatingLabel>
        <RatingInput id="2" type="radio" value="2" onClick={this.updatRating} />
        <RatingLabel htmlFor="2">Poor</RatingLabel>
        <RatingInput id="1" type="radio" value="1" onClick={this.updatRating} />
        <RatingLabel htmlFor="1">Abysmal</RatingLabel>
      </RatingWrapper>
    );
  }
}

export default Rating;
