import React, { Component } from 'react';
import styled from 'styled-components';

import { spinKeyframe } from '../../globalStyles';
import starIcon from '../../assets/icons/star.svg';
import goldStarIcon from '../../assets/icons/gold-star.svg';

const RatingWrapper = styled.form`
  display: grid;
  grid-template-columns: repeat(5, 35px) auto;
  align-items: center;
  &.submitted {
    //TODO: Maybe swap DOM with feedback message instead of this
    display: none;
  }
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

const RatingTotal = styled.span`
  padding-left: var(--spacing-medium);
`;

const SubmitRating = styled.button`
  display: none;
  &.active {
    display: block;
  }
`;

class Rating extends Component {
  state = {
    rating: 0
  }

  componentWillMount() {
    if (this.props.ratings && this.props.ratings.length > 0) {
      this.calculateAverageRating(this.props.ratings);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ratings && nextProps.ratings.length > 0) {
      this.calculateAverageRating(nextProps.ratings);
    }
  }

  calculateAverageRating = (ratings) => {
    const sum = ratings.reduce((a, b) => a + b);
    const avg = sum / ratings.length;
    this.setState({
      rating: avg
    });
  }

  totalRatings = () => {
    if (this.props.ratings && this.props.ratings.length) {
      return `${this.props.ratings.length} Rating${this.props.ratings.length > 1 ? 's' : ''}`;
    }

    return `No ratings yet.`;
  }

  renderRating = () => {
    if (this.props.readonly) {
      return (
        <RatingWrapper>
          <RatingInput id="1" type="radio" value="1" />
          <RatingLabel className={this.state.rating >= 1 ? 'active' : ''} htmlFor="1">Abysmal</RatingLabel>
          <RatingInput id="2" type="radio" value="2" />
          <RatingLabel className={this.state.rating >= 2 ? 'active' : ''} htmlFor="2">Poor</RatingLabel>
          <RatingInput id="3" type="radio" value="3" />
          <RatingLabel className={this.state.rating >= 3 ? 'active' : ''} htmlFor="3">Alright</RatingLabel>
          <RatingInput id="4" type="radio" value="4" />
          <RatingLabel className={this.state.rating >= 4 ? 'active' : ''} htmlFor="4">Good</RatingLabel>
          <RatingInput id="5" type="radio" value="5" />
          <RatingLabel className={this.state.rating >= 5 ? 'active' : ''} htmlFor="5">Great</RatingLabel>
          <RatingTotal>
            {this.totalRatings()}
          </RatingTotal>
        </RatingWrapper>
      );
    }

    return (
      <RatingWrapper onSubmit={this.props.handleSubmit} className={this.props.submitted ? 'submitted' : ''}>
        <RatingInput id="1" type="radio" value="1" onClick={this.props.updateRating} />
        <RatingLabel className={this.props.rating >= 1 ? 'active' : ''} htmlFor="1">Abysmal</RatingLabel>
        <RatingInput id="2" type="radio" value="2" onClick={this.props.updateRating} />
        <RatingLabel className={this.props.rating >= 2 ? 'active' : ''} htmlFor="2">Poor</RatingLabel>
        <RatingInput id="3" type="radio" value="3" onClick={this.props.updateRating} />
        <RatingLabel className={this.props.rating >= 3 ? 'active' : ''} htmlFor="3">Alright</RatingLabel>
        <RatingInput id="4" type="radio" value="4" onClick={this.props.updateRating} />
        <RatingLabel className={this.props.rating >= 4 ? 'active' : ''} htmlFor="4">Good</RatingLabel>
        <RatingInput id="5" type="radio" value="5" onClick={this.props.updateRating} />
        <RatingLabel className={this.props.rating >= 5 ? 'active' : ''} htmlFor="5">Great</RatingLabel>
        <SubmitRating className={this.props.changed ? 'active' : ''}>Submit Rating</SubmitRating>
      </RatingWrapper>
    );
  }

  render() {
    return this.renderRating();
  }
}

export default Rating;
