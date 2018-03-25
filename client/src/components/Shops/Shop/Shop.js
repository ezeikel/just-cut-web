import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../../store/actions/index';
import GoogleMap from '../../GoogleMap/GoogleMap';
import Rating from '../../Rating/Rating';

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

class Shop extends Component {
  componentDidMount() {
    if (this.props.match) {
      this.props.onFetchShop(this.props.match.params.slug);
    }
  }

  render() {
    const props = this.props.match ? this.props.shop : this.props;

    return (
      <ShopWrapper>
        <ShopTitle>{props.name}</ShopTitle>
        <ShopDetails>
          <address>{props.location.address}</address>
          <Rating ratings={props.ratings} />
        </ShopDetails>
        <ShopImage photo={props.photo ? props.photo : 'http://lorempixel.com/output/business-q-g-640-480-8.jpg'} />
        <GoogleMap lat={props.location.coordinates[1]} lng={props.location.coordinates[0]} />
      </ShopWrapper>
    );
  }
}

const mapStateToProps = state => (
  {
    shop: state.shop.shop,
    loading: state.shop.loading
  }
);

const mapDispatchToProps = dispatch => (
  { onFetchShop: (slug) => dispatch(actions.fetchShop(slug)) }
);

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
