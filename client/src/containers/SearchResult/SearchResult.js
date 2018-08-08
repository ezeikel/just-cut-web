import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Rating from '../../components/Rating/Rating';

import markerIcon from '../../assets/icons/map-marker.svg';

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

const SearchResultTitle = styled.div`
  line-height: 24px;
  color: var(--color-black);
`;

const SearchResultDetails = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-row-gap: var(--spacing-small);
    color: #828585;
`;
SearchResultDetails.displayName = 'SearchResultDetails';

const SearchResultTags = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max-content, 50px));
  grid-gap: var(--spacing-small);
  font-size: 14px;
  //line-height: 22px;
  li {
    display: grid;
    place-items: center;
    padding: var(--spacing-small);
    background-color: rgb(245, 245, 245);
    color: var(--color-black);
  }
`;
SearchResultTags.displayName = 'SearchResultTags';

const SearchResultDistance = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 4px;
  align-items: center;
`;
SearchResultDistance.displayName = 'SearchResultDistance';

const SearchResult = props => (
  <StyledLink to={`shop/${props.slug}`}>
    <SearchResultImage photo={props.photo} />
    <SearchResultTitle>{props.name}</SearchResultTitle>
    <SearchResultDetails>
      <SearchResultTags>
        {props.tags.map(tag => (<li key={tag}>{tag}</li>))}
        <li>{props.priceLevel}</li>
      </SearchResultTags>
      <SearchResultDistance>
        <span><img src={markerIcon} alt="marker-icon" /></span><span>{Math.round(props.distance * 10) / 10} mile{Math.round(props.distance * 10) / 10 === 1 ? '' : 's'}</span>
      </SearchResultDistance>
      <Rating readonly ratings={props.ratings} />
    </SearchResultDetails>
  </StyledLink>
);

export default SearchResult;
