import React, { Component } from 'react';
import styled from 'styled-components';

import starIcon from '../../assets/icons/star.svg';
import goldStarIcon from '../../assets/icons/star-o.svg';

const RatingWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 35px) auto;
  align-items: center;
  &.submitted {
    //TODO: Maybe swap DOM with feedback message instead of this
    display: none;
  }
`;
RatingWrapper.displayName = 'RatingWrapper';

const Star = styled.div`
  cursor: pointer;
`;
Star.displayName = 'Star';

const SVG = styled.svg`
  pointer-events: none;
  width: 32px;
  height: 32px;
  path {
    fill: var(--color-grey);
  }
  .active & {
    path {
      fill: var(--color-black);
    }
  }
  .hover & {
    path {
      fill: var(--color-yellow);
    }
  }
`;
SVG.displayName = 'Star';

const RatingLabel = styled.label`
  background-image: url(${starIcon});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  text-indent: -9999px;
  height: 25px;
  &.active {
    background-image: url(${goldStarIcon});
  }
`;
RatingLabel.displayName = 'RatingLabel';

const RatingTotal = styled.span`
  padding-left: var(--spacing-medium);
`;
RatingTotal.displayName = 'RatingTotal';

const SubmitRating = styled.button`
  display: none;
  &.active {
    display: block;
  }
`;
SubmitRating.displayName = 'SubmitRating';

class Rating extends Component {
  state = {
    hover: 0
  }

  componentWillMount() {
    // if ratings passed into component work out average rating
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
    //const sum = ratings.reduce((a, b) => a + b);
    //const avg = sum / ratings.length;

    // set average rating based on ratings passed to component
    // this.setState({
    //   rating: avg
    // });
  }

  totalRatings = () => {
    if (this.props.ratings && this.props.ratings.length) {
      return `${this.props.ratings.length} Rating${this.props.ratings.length > 1 ? 's' : ''}`;
    }

    return `No ratings yet.`;
  }

  addHoverState = ({ target }) => {
    const { rating } = target.dataset;
    this.setState({
      hover: rating
    });
  }

  removeHoverState = () => {
    console.log('Remove hover state');
    this.setState({
      hover: 0
    });
  }

  renderStars = () => [1, 2, 3, 4, 5].map(rating => {
    const hover = rating <= this.state.hover ? 'hover' : '';
    const active = rating <= this.props.rating ? 'active' : '';
    return (
      <Star className={`${active} ${hover}`} onClick={this.props.updateRating} onMouseEnter={this.addHoverState} data-rating={rating} key={rating} >
        <SVG>
          <path d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798zM16 23.547l-6.983 3.671 1.334-7.776-5.65-5.507 7.808-1.134 3.492-7.075 3.492 7.075 7.807 1.134-5.65 5.507 1.334 7.776-6.983-3.671z" />
        </SVG>
      </Star>
    );
  });

  render() {
    let total = null;

    if (this.props.readonly) {
      total = (
        <RatingTotal>
          {this.totalRatings()}
        </RatingTotal>
      );
    }

    return (
      <RatingWrapper onMouseLeave={this.removeHoverState}>
        {this.renderStars()}
        {total}
      </RatingWrapper>
    );
  }
}

export default Rating;
