import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../../store/actions/index';
import GoogleMap from '../../GoogleMap/GoogleMap';
import Rating from '../../Rating/Rating';

import spinnerIcon from '../../../assets/icons/spinner.svg';

const ShopWrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-medium);
`;

const ShopTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  color: var(--color-black);
  text-transform: uppercase;
`;

const ShopDetails = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: var(--spacing-small);
  align-items: center;
  color: lightslategray;
`;

const ShopImage = styled.div`
  background-image: ${props => `url(${props.photo})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 300px;
`;

const Spinner = styled.div`
  height: 100px;
  background-image: url(${spinnerIcon});
  background-repeat: no-repeat;
  background-position: center;
`

class Shop extends Component {
  state = {
    ratingChanged: false,
    ratingSubmitted: false
  }

  componentDidMount() {
    if (this.props.match) {
      this.props.onFetchShop(this.props.match.params.slug);
    }
  }

  updateRating = ({ target }) => {
    this.setState({
      ratingChanged: true
    });

    this.props.onUpdateRating(target.id);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddRating(this.props.shop._id, this.props.rating);
    this.setState({
      ratingSubmitted: true
    })
  }

  renderShop() {
    const props = this.props.match ? this.props.shop : this.props;

    return (
      <ShopWrapper>
        <ShopTitle>{props.name}</ShopTitle>
        <ShopDetails>
          <address>{props.location.address}</address>
          <Rating rating={this.props.rating} updateRating={this.updateRating} handleSubmit={this.handleSubmit} changed={this.state.ratingChanged} submitted={this.state.ratingSubmitted} />
        </ShopDetails>
        <ShopImage photo={props.photo ? props.photo : 'http://lorempixel.com/output/business-q-g-640-480-8.jpg'} />
        <GoogleMap lat={props.location.coordinates[1]} lng={props.location.coordinates[0]} />
      </ShopWrapper>
    );
  }

  render() {
    return this.props.loading ? <Spinner /> : this.renderShop();
  }
}

const mapStateToProps = state => (
  {
    shop: state.shop.shop,
    rating: state.shop.rating,
    loading: state.shop.loading
  }
);

const mapDispatchToProps = dispatch => (
  { 
    onFetchShop: (slug) => dispatch(actions.fetchShop(slug)),
    onAddRating: (id, rating) => dispatch(actions.addRating(id, rating)),
    onUpdateRating: (rating) => dispatch(actions.updateRating(rating))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
