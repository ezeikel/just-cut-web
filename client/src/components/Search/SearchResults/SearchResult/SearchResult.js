import React from 'react';
import GoogleMap from '../../../GoogleMap/GoogleMap';

const SearchResult = (props) => (
  <div>
    <h3>{props.name}</h3>
    <img src={props.photo ? `/public/uploads/${props.photo}` : 'http://lorempixel.com/output/business-q-g-640-480-8.jpg'} />
    <GoogleMap lat={props.lat} lng={props.lng} />
  </div>
);

export default SearchResult;
