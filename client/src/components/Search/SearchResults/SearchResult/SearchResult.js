import React from 'react';
import { Link } from 'react-router-dom';
import GoogleMap from '../../../GoogleMap/GoogleMap';

const SearchResult = (props) => (
  <li className="search-result__list-item">
    <Link to={`shop/${props.slug}`}>
      <h3>{props.name}</h3>
      <img src={props.photo ? `/public/uploads/${props.photo}` : 'http://lorempixel.com/output/business-q-g-640-480-8.jpg'} alt={props.slug} />
      <GoogleMap lat={props.lat} lng={props.lng} />
    </Link>
  </li>
);

export default SearchResult;
