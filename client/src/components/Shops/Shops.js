import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Shops extends Component {
  componentDidMount() {
    this.props.onFetchShops();
  }

  render() {
    const shops = this.props.shops.map(shop => (
      <div key={shop.slug}>
        <h3>{shop.name}</h3>
        <span>{shop.slug}</span>
        <img height={300} width={300} src={`/public/uploads/${shop.photo}`} alt={shop.slug} />
      </div>
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
    shops: state.shops.shops,
    loading: state.shops.loading
  }
);

const mapDispatchToProps = dispatch => (
  { onFetchShops: () => dispatch(actions.fetchShops()) }
);

export default connect(mapStateToProps, mapDispatchToProps)(Shops);
