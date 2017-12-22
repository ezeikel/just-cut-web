import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class Shops extends Component {
    componentDidMount() {
        this.props.onFetchShops();
    }

    render() {
        const shops = this.props.shops.map( shop => (
            <div>
                <h3>{shop.name}</h3>
                <address>{shop.address}</address>
                <span>{shop.slug}</span>
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