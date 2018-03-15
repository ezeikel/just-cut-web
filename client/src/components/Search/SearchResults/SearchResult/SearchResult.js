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
  height: 300px;
`;

const SearchResultTitle = styled.h3`
  margin: 0;
  font-size: 24px;
  color: var(--color-black);
  text-transform: uppercase;
`;

const SearchResultDetails = styled.div`
  color: lightslategray;
`;

const SearchResultPostCode = styled.span`
  font-size: 14px;
`;

const SearchResultTags = styled.span`
  font-size: 14px;
`;

const SearchResult = (props) => (
  <StyledLink to={`shop/${props.slug}`}>
    <SearchResultTitle>{props.name}</SearchResultTitle>
    <SearchResultImage photo={props.photo}></SearchResultImage>
    <SearchResultDetails>
      <SearchResultPostCode>{props.location.address}</SearchResultPostCode>
      <SearchResultTags>{props.tags}</SearchResultTags>
    </SearchResultDetails>
  </StyledLink>
);

export default SearchResult;
