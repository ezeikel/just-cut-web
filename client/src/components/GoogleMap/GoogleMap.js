import React, { Component } from 'react';

class GoogleMap extends Component {
  componentDidMount() {
    const shop = { lat: this.props.lat, lng: this.props.lng };
    this.map = new google.maps.Map(this.mapEl, { // eslint-disable-line
      zoom: 15,
      center: shop
    });

    new google.maps.Marker({ // eslint-disable-line
      position: shop,
      map: this.map
    });
  }

  componentWillReceiveProps(nextProps) {
    // TODO: Fix issue where new coords props come through but not updated via render
    this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="map" ref={(div) => { this.mapEl = div; }} />
    );
  }
}

export default GoogleMap;
