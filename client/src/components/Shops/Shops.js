import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Shop from './Shop/Shop';

class Shops extends Component {
  componentDidMount() {
    this.props.onFetchShops();
  }

  render() {
    const shops = this.props.shops.map(shop => (
      <Shop key={shop._id} lng={shop.location.coordinates[0]} lat={shop.location.coordinates[1]} name={shop.name} photo={shop.photo} />
    ));
    return (
      <div>
        <h2>Shops:</h2>
        {shops}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    shops: state.shop.shops,
    loading: state.shop.loading
  }
);

const mapDispatchToProps = dispatch => (
  { onFetchShops: () => dispatch(actions.fetchShops()) }
);

export default connect(mapStateToProps, mapDispatchToProps)(Shops);
