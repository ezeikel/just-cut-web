import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  color: #828585;
`;

const SearchResultPostCode = styled.span`
  font-size: 14px;
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

const SearchResult = (props) => (
  <StyledLink to={`shop/${props.slug}`}>
    <SearchResultImage photo={props.photo} />
    <SearchResultTitle>{props.name}</SearchResultTitle>
    <SearchResultDetails>
      <SearchResultTags>
        {props.tags.map(tag => (<li>{tag}</li>))}
      </SearchResultTags>
    </SearchResultDetails>
  </StyledLink>
);

export default SearchResult;
