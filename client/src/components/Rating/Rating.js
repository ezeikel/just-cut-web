import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  grid-template-rows: ${props => (props.readonly ? `repeat(2, auto)` : `auto`)};
  grid-template-columns: ${props => (props.readonly ? `auto` : `1fr auto`)};
  grid-row-gap: var(--spacing-tiny);
  grid-column-gap: var(--spacing-medium);
  place-items: center;
`;
Wrapper.displayName = 'Wrapper';

const StarsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 24px) auto;
`;
StarsContainer.displayName = 'StarsContainer';

const Star = styled.div`
  cursor: pointer;
`;
Star.displayName = 'Star';

const Button = styled.button`
  span {
    color: var(--color-black);
    transition: all 0.2s ease-in-out;
    border: 2px solid var(--color-primary);
    padding: var(--spacing-small) var(--spacing-medium);
    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
    }
  }
`;
Button.displayName = 'Button';

const SVG = styled.svg`
  display: grid;
  place-items: center;
  pointer-events: none;
  polygon {
    fill: var(--color-grey);
    fill-rule: nonzero;
  }
  .active & {
    polygon {
      fill: var(--color-gold-star);
    }
  }
  .hover & {
    polygon {
      fill: var(--color-gold-star);
    }
  }
`;
SVG.displayName = 'Star';

const TotalReviews = styled.span`
`;
TotalReviews.displayName = 'TotalReviews';

class Rating extends Component {
  state = {
    hover: 0,
    rating: 0
  }

  componentDidMount() {
    // if ratings passed into component work out overall rating
    if (this.props.ratings && this.props.ratings.length > 0) {
      this.calculateOverallRating(this.props.ratings);
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

  calculateOverallRating = ratings => {
    const sum = ratings.reduce((a, b) => a + b);
    const overall = Math.round(sum / ratings.length);

    // set overall rating based on ratings passed to component
    this.setState({
      rating: overall
    });
  }

  totalReviews = () => {
    if (this.props.ratings && this.props.ratings.length) {
      return `${this.props.ratings.length} review${this.props.ratings.length > 1 ? 's' : ''}`;
    }

    return 'No reviews yet.';
  }

  renderTotalReviews = () => (
    <TotalReviews>
      {this.totalReviews()}
    </TotalReviews>
  );

  renderSubmitButton = () => (
    <Button onClick={() => this.props.setRating(this.state.rating)}><span>Submit</span></Button>
    // TODO: https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
  );

  renderStars = () => [1, 2, 3, 4, 5].map(number => {
    const rating = this.props.userRating ? this.props.userRating : this.state.rating;
    const hover = number <= this.state.hover ? 'hover' : '';
    const active = number <= rating ? 'active' : '';

    return (
      <Star className={`${active} ${hover}`} onClick={this.selectRating} onMouseEnter={this.props.readonly || this.props.submitted ? null : this.onHover} data-rating={number} key={number} >
        <SVG viewBox="0 0 21.78 21.78">
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
        </SVG>
      </Star>
    );
  });

  render() {
    const { readonly, submitted } = this.props;
    return (
      <Wrapper readonly={readonly} onMouseLeave={readonly || submitted ? null : this.onLeave}>
        <StarsContainer>
          {this.renderStars()}
        </StarsContainer>
        {readonly ? this.renderTotalReviews() : null}
        {readonly || submitted ? null : this.renderSubmitButton()}
      </Wrapper>
    );
  }
}

export default Rating;
