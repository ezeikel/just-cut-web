import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Rating from '../../components/Rating/Rating';

import markerIcon from '../../assets/icons/map-marker.svg';

const StyledLink = styled(Link)`
  display: grid;
  grid-template-rows: 1fr auto auto;
  grid-row-gap: var(--spacing-medium);
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
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--color-black);
`;

const SearchResultDetails = styled.div`
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: var(--spacing-medium);
    color: #828585;
`;
SearchResultDetails.displayName = 'SearchResultDetails';

const SearchResultTags = styled.ul`
  grid-row: 2 / -1;
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 22px;
`;
SearchResultTags.displayName = 'SearchResultTags';

const Tag = styled.li`
  display: grid;
  place-items: center;
  padding: var(--spacing-small);
  background-color: rgb(245, 245, 245);
  color: var(--color-black);
  flex: 0 1 auto;
  margin-bottom: var(--spacing-small);
  margin-right: var(--spacing-small);
`;
Tag.displayName = 'Tag';

const SearchResultDistance = styled.div`
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-small);
  align-items: end;
  + section {
    grid-row: 1 / span 1;
    grid-column: 2 / -1;
  }
`;
SearchResultDistance.displayName = 'SearchResultDistance';

const MarkerIcon = styled.span`
`;
MarkerIcon.displayName = 'MarkerIcon';

const MilesAway = styled.span`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: end;
  grid-column-gap: var(--spacing-small);
`;
MilesAway.displayName = 'MilesAway';

const BigNumber = styled.span`
  font-size: 32px;
  line-height: 1;
`;
BigNumber.displayName = 'BigNumber';

const SearchResult = props => (
  <StyledLink to={`shop/${props.slug}`}>
    <SearchResultImage photo={props.photo} />
    <SearchResultTitle>{props.name}</SearchResultTitle>
    <SearchResultDetails>
      <SearchResultDistance>
        <MarkerIcon>
          <img src={markerIcon} alt="marker-icon" />
        </MarkerIcon>
        <MilesAway>
          <BigNumber>{Math.round(props.distance * 10) / 10}</BigNumber>
          mile{Math.round(props.distance * 10) / 10 === 1 ? '' : 's'}
        </MilesAway>
      </SearchResultDistance>
      <Rating readonly ratings={props.ratings} />
      <SearchResultTags>
        {props.tags.map(tag => (<Tag key={tag}>{tag}</Tag>))}
        <Tag>{props.priceLevel}</Tag>
      </SearchResultTags>
    </SearchResultDetails>
  </StyledLink>
);

export default SearchResult;
