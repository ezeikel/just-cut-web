import React, { Component } from 'react';

class GoogleMap extends Component {
  componentWillReceiveProps(nextProps) {
    const shop = { lat: nextProps.lat, lng: nextProps.lng };
    this.map = new google.maps.Map(this.mapEl, { // eslint-disable-line
      zoom: 15,
      center: shop
    });

    new google.maps.Marker({ // eslint-disable-line
      position: shop,
      map: this.map
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.lat !== nextProps.lat;
  }

  render() {
    return (
      <div className="map" ref={(div) => { this.mapEl = div; }} />
    );
  }
}

export default GoogleMap;
