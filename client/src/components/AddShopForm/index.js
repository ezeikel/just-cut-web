import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

class AddShop extends Component {
    handleFormInputChange = (e) => {
        this.props.onHandleFormInputChange(e.target.name, e.target.value);
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
                    <textarea name="address" value={this.props.address} onChange={this.handleFormInputChange}></textarea>
                    <input type="submit" value="Save" />
                </form>
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
        onHandleFormInputChange: (name, value) => dispatch(actions.handleFormInputChange(name, value)),
        onAddShop: (name, address) => dispatch(actions.addShop(name, address))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);