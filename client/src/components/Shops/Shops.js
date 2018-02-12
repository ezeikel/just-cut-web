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
      <li>
        <Shop key={shop.id} id={shop.id} name={shop.name} slug={shop.slug} location={shop.location} photo={shop.photo} />
      </li>
    ));
    return (
      <section>
        <h2>Shops:</h2>
        <ul>
          {shops}
        </ul>
      </section>
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
