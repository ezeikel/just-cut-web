import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import markerIcon from '../../../../assets/icons/map-marker.svg';

const StyledLink = styled(Link)`
  display: grid;
  grid-template-rows: 1fr auto auto;
  grid-row-gap: var(--spacing-small);
`;

const SearchResultImage = styled.div`
  background-image: ${props => `url(${props.photo})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 200px;
`;

const SearchResultTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: var(--color-black);
  text-transform: uppercase;
`;

const SearchResultDetails = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: var(--spacing-small);
    color: #828585;
`;

const SearchResultTags = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  grid-gap: var(--spacing-small);
  font-size: 14px;
  li {
    padding: 4px;
    background-color: palevioletred;
    color: var(--color-white)
  }
`;

const SearchResultDistance = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 4px;
  align-items: center;
`;

const SearchResult = (props) => (
  <StyledLink to={`shop/${props.slug}`}>
    <SearchResultImage photo={props.photo} />
    <SearchResultTitle>{props.name}</SearchResultTitle>
    <SearchResultDetails>
      <SearchResultTags>
        {props.tags.map(tag => (<li key={tag}>{tag}</li>))}
      </SearchResultTags>
      <SearchResultDistance>
        <span><img src={markerIcon} alt="marker-icon" /></span><span>{Math.round(props.distance * 10) / 10}miles</span>
      </SearchResultDistance>
    </SearchResultDetails>
  </StyledLink>
);

export default SearchResult;
