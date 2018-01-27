import React from 'react';
import GoogleMap from '../../GoogleMap/GoogleMap';

const SearchResult = (props) => (
  <div>
      <h3>{props.name}</h3>
      <GoogleMap lat={props.lat} lng={props.lng} />
  </div>
);

export default SearchResult;