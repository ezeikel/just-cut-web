import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';

import * as actions from '../../store/actions/index';

class AddShop extends Component {
    handleNameChange = (e) => {
        this.props.onAddShopNameChanged(e.target.value);
    }

    handleAddressChange = (e) => {
        this.props.onAddShopAddressChanged(e.target.value);    
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();
        const {name, address} = this.props;
        this.props.onAddShop(name, address);
    }

    render() {
        return (
            <Aux>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={this.props.name} onChange={this.handleNameChange} />
                    <label htmlFor="address">Address</label>
                    <textarea name="address" value={this.props.address} onChange={this.handleAddressChange}></textarea>
                    <input type="submit" value="Save" />
                </form>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.shop.name,
        address: state.shop.address
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShops: () => dispatch(actions.fetchShops()),
        onAddShopNameChanged: (name) => dispatch(actions.addShopNameChanged(name)),
        onAddShopAddressChanged: (address) => dispatch(actions.addShopAddressChanged(address)),
        onAddShop: (name, address) => dispatch(actions.addShop(name, address))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);
