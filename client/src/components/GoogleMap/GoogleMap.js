import React, { Component } from 'react';

class GoogleMap extends Component {
    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng });
    }

    componentDidMount() {
       const shop = {lat: this.props.lat, lng: this.props.lng};
       this.map = new google.maps.Map(this.refs.map, { // eslint-disable-line
           zoom: 15,
           center: shop
       });

       new google.maps.Marker({ // eslint-disable-line
           position: shop,
           map: this.map
       });
    }

    render() {
       return <div className="map" ref="map" />
    }
}

export default GoogleMap;