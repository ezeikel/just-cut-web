import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Rating from '../../components/Rating/Rating';

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
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--spacing-medium);
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
  grid-column: 1 / span 2;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-small);
  align-items: end;
  + section {
    grid-row: 1 / span 1;
    grid-column: 3 / -1;
  }
`;
SearchResultDistance.displayName = 'SearchResultDistance';

const MarkerIcon = styled.svg`
   width: 16px;
   height: 32px;
   fill: var(--color-dark-red);
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

const SearchResult = ({
  slug, photo, name, distance, ratings, tags, priceLevel
}) => (
  <StyledLink to={`shop/${slug}`}>
    <SearchResultImage photo={photo} />
    <SearchResultTitle>{name}</SearchResultTitle>
    <SearchResultDetails>
      <SearchResultDistance>
        <MarkerIcon viewBox="0 0 16 32">
          <path d="M12 10c0-2.203-1.797-4-4-4s-4 1.797-4 4 1.797 4 4 4 4-1.797 4-4zM16 10c0 0.953-0.109 1.937-0.516 2.797l-5.688 12.094c-0.328 0.688-1.047 1.109-1.797 1.109s-1.469-0.422-1.781-1.109l-5.703-12.094c-0.406-0.859-0.516-1.844-0.516-2.797 0-4.422 3.578-8 8-8s8 3.578 8 8z" />
        </MarkerIcon>
        <MilesAway>
          <BigNumber>{Math.round(distance * 10) / 10}</BigNumber>
          mile{Math.round(distance * 10) / 10 === 1 ? '' : 's'}
        </MilesAway>
      </SearchResultDistance>
      <Rating readonly ratings={ratings} />
      <SearchResultTags>
        {tags.map(tag => (<Tag key={tag}>{tag}</Tag>))}
        <Tag>{priceLevel}</Tag>
      </SearchResultTags>
    </SearchResultDetails>
  </StyledLink>
);

export default SearchResult;
