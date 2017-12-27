import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class AddShop extends Component {
    componentDidMount() {
        const input = document.querySelector('[name="address"]');
        const dropdown = new google.maps.places.Autocomplete(input); // eslint-disable-line
    }

    handleFormInputChange = (e) => {
        this.props.onHandleFormInputChange(e.target.name, e.target.value);
    }

    handleFormInputAddressChange = (e) => {
        this.props.onHandleFormInputAddressChange(e.target.value);
    }

    handleFormInputAddressCoordinatesChange = (e) => {
        this.props.onHandleFormInputAddressCoordinatesChange(e.target.name, e.target.value);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const {name, location} = this.props;
        this.props.onAddShop(name, location);
    }

    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={this.props.name} onChange={this.handleFormInputChange} />
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={this.props.location.address} onChange={this.handleFormInputAddressChange} />
                    <label htmlFor="address">Address Lng</label>
                <input type="text" name="lng" value={this.props.location.coordinates.lng} onChange={this.handleFormInputAddressCoordinatesChange} />
                    <label htmlFor="address">Address Lat</label>
                <input type="text" name="lat" value={this.props.location.coordinates.lat} onChange={this.handleFormInputAddressCoordinatesChange} />
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
        onHandleFormInputAddressChange: (value) => dispatch(actions.handleFormInputAddressChange(value)),
        onHandleFormInputAddressCoordinatesChange: (name, value) => dispatch(actions.handleFormInputAddressCoordinatesChange(name, value)),
        onAddShop: (name, location) => dispatch(actions.addShop(name, location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddShop);