import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import Shop from '../../containers/Shop';

class Shops extends Component {
    componentDidMount() {
        this.props.onFetchShops();
    }

    render() {
        const shops = this.props.shops.map( shop => (
                <Shop key={shop._id} name={shop.name} address={shop.location.address} slug={shop.slug} />
        ));
        return (
            <div>
                <h2>Shops:</h2>
                {shops}
            </div>
        );     
    }
}

const mapStateToProps = state => {
    return {
        shops: state.shop.shops,
        loading: state.shop.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShops: () => dispatch(actions.fetchShops())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shops);