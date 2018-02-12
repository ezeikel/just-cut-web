import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

import GoogleMap from '../../GoogleMap/GoogleMap';

class Shop extends Component {
  componentDidMount() {
    if (this.props.match) {
      this.props.onFetchShop(this.props.match.params.slug);
    }
  }

  render() {
    const props = this.props.match ? this.props.shop : this.props;

    return (
      <div>
        <h3>{props.name}</h3>
        <span>{props.slug}</span>
        <address>{props.location.address}</address>
        <img height={300} width={300} src={props.photo ? `/public/uploads/${props.photo}` : 'http://lorempixel.com/output/business-q-g-640-480-8.jpg'} alt={props.slug} />
        <GoogleMap lat={props.location.coordinates[1]} lng={props.location.coordinates[0]} />
      </div>
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
