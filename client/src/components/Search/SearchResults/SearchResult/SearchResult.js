import React from 'react';
import { Link } from 'react-router-dom';
import Shop from '../../../Shops/Shop/Shop';

const SearchResult = (props) => (
  <Link to={`shop/${props.slug}`}>
    <Shop key={props.id} id={props.id} name={props.name} slug={props.slug} location={props.location} photo={props.photo} />
  </Link>
);

export default SearchResult;
