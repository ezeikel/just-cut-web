import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import Aux from '../../../hoc/Aux/Aux';
import GoogleMap from '../../GoogleMap/GoogleMap';

class Shop extends Component {
  componentDidMount() {
    this.props.onFetchShop(this.props.match.params.slug);
  }

  render() {
    return (
      <Aux>
        <h3>{this.props.shop.name}</h3>
        <span>{this.props.shop.slug}</span>
        <address>{this.props.shop.location.address}</address>
        <img src={this.props.shop.photo ? `/public/uploads/${this.props.shop.photo}` : 'http://lorempixel.com/output/business-q-g-640-480-8.jpg'} alt={this.props.shop.slug} />
        <GoogleMap lat={this.props.shop.location.coordinates[1]} lng={this.props.shop.location.coordinates[0]} />
      </Aux>
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
