import React, { Component } from 'react';

class GoogleMap extends Component {
    componentDidMount() {
       const shop = {lat: this.props.lat, lng: this.props.lng};
       const map = new google.maps.Map(this.refs.map, { // eslint-disable-line
           zoom: 15,
           center: shop
       });

       new google.maps.Marker({ // eslint-disable-line
           position: shop,
           map
       });
    }

    render() {
       return <div className="map" ref="map" />
    }
}

export default GoogleMap;