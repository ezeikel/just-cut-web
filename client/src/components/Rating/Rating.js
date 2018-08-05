import React, { Component } from 'react';
import styled from 'styled-components';

const RatingWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 35px) auto;
  align-items: center;
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
  polygon {
    fill: var(--color-grey);
    fill-rule: nonzero;
  }
  .active & {
    polygon {
      fill: var(--color-yellow);
    }
  }
  .hover & {
    polygon {
      fill: var(--color-yellow);
    }
  }
`;
SVG.displayName = 'Star';

const RatingTotal = styled.span`
  padding-left: var(--spacing-medium);
`;
RatingTotal.displayName = 'RatingTotal';


class Rating extends Component {
  state = {
    hover: 0,
    rating: 0
  }

  componentDidMount() {
    // if ratings passed into component work out average rating
    if (this.props.ratings && this.props.ratings.length > 0) {
      this.calculateAverageRating(this.props.ratings);
    }
  }

  onHover = ({ target }) => {
    const { rating } = target.dataset;
    this.setState({
      hover: rating
    });
  }

  onLeave = () => {
    this.setState({
      hover: 0
    });
  }

  selectRating = ({ target }) => {
    const { rating } = target.dataset;
    this.setState({
      rating
    });
  }

  totalRatings = () => {
    if (this.props.ratings && this.props.ratings.length) {
      return `${this.props.ratings.length} Rating${this.props.ratings.length > 1 ? 's' : ''}`;
    }

    return 'No ratings yet.';
  }

  calculateAverageRating = (ratings) => {
    const sum = ratings.reduce((a, b) => a + b);
    const avg = Math.round(sum / ratings.length);

    // set average rating based on ratings passed to component
    this.setState({
      rating: avg
    });
  }

  renderStars = () => [1, 2, 3, 4, 5].map(number => {
    const rating = this.props.userRating ? this.props.userRating : this.state.rating;
    const hover = number <= this.state.hover ? 'hover' : '';
    const active = number <= rating ? 'active' : '';

    return (
      <Star className={`${active} ${hover}`} onClick={this.selectRating} onMouseEnter={this.props.readonly || this.props.submitted ? null : this.onHover} data-rating={number} key={number} >
        <SVG>
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
        </SVG>
      </Star>
    );
  });

  render() {
    let total = null;
    const submitRating = this.props.readonly || this.props.submitted ? null : (
      <button onClick={() => this.props.setRating(this.state.rating)}>Submit</button>
      // TODO: https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    );

    if (this.props.readonly) {
      total = (
        <RatingTotal>
          {this.totalRatings()}
        </RatingTotal>
      );
    }

    return (
      <RatingWrapper onMouseLeave={this.props.readonly || this.props.submitted ? null : this.onLeave}>
        {this.renderStars()}
        {submitRating}
        {total}
      </RatingWrapper>
    );
  }
}

export default Rating;
