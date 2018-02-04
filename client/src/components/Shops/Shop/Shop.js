import React from 'react';
import GoogleMap from '../../GoogleMap/GoogleMap';

import Aux from '../../../hoc/Aux/Aux';

const Shop = props => (
  <Aux>
    <h3>{props.name}</h3>
    <span>{props.slug}</span>
    <address>{props.address}</address>
    <img src={props.photo ? `/public/uploads/${props.photo}` : 'http://lorempixel.com/output/business-q-g-640-480-8.jpg'} alt={props.slug} />
    <GoogleMap lat={props.lat} lng={props.lng} />
  </Aux>
);

export default Shop;
