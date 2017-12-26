import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class AddShop extends Component {
    handleFormInputChange = (e) => {
        this.props.onHandleFormInputChange(e.target.name, e.target.value);
    }

    handleFormInputAddressChange = (e) => {
        this.props.onHandleFormInputAddressChange(e.target.value);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {name, address} = this.props;
        this.props.onAddShop(name, address);
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={this.props.name} onChange={this.handleFormInputChange} />
                    <label htmlFor="address">Address</label>
                    <input type="text" name="location.address" value={this.props.location.address} onChange={this.handleFormInputAddressChange} />
                    <label htmlFor="address">Address Lng</label>
                <input type="text" name="location.coordinates[0]" value={this.props.location.coordinates[0]} onChange={this.handleFormInputChange} />
                    <label htmlFor="address">Address Lat</label>
                <input type="text" name="location.coordinates[1]" value={this.props.location.coordinates[1]} onChange={this.handleFormInputChange} />
                    <input type="submit" value="Save" />
                </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.shop.name,
        location: state.shop.location
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchShops: () => dispatch(actions.fetchShops()),
        onHandleFormInputChange: (name, value) => dispatch(actions.handleFormInputChange(name, value)),
        onHandleFormInputAddressChange: (name, value) => dispatch(actions.handleFormInputAddressChange(name, value)),
        onAddShop: (name, address) => dispatch(actions.addShop(name, address))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);