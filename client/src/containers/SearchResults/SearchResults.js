import React, { Component } from 'react';
import styled from 'styled-components';

import SearchResult from '../SearchResult/SearchResult';

const SearchResultsWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: var(--spacing-large);
`;
SearchResultsWrapper.displayName = 'SearchResultsWrapper';

const ResultsHeader = styled.header`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-medium);
  align-items: center;
`;
ResultsHeader.displayName = 'ResultsHeader';

const Number = styled.span`
  font-size: 32px;
`;
Number.displayName = 'Number';

const List = styled.ul`
  display: grid;
  grid-row-gap: var(--spacing-medium);
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--spacing-large);
  }
`;
List.displayName = 'List';

class SearchResults extends Component {
  renderSearchResults = () => {
    if (this.props.results.length > 0) {
      return this.props.results.map(shop => (
        <li key={shop._id}>
          <SearchResult id={shop._id} slug={shop.slug} location={shop.location} distance={shop.distance} lng={shop.location.coordinates[0]} lat={shop.location.coordinates[1]} name={shop.name} photo={shop.photo} tags={shop.tags} priceLevel={shop.priceLevel} ratings={shop.ratings} />
        </li>
      ));
    }
  }

  render() {
    const { results, postcode, area } = this.props;

    return (
      <SearchResultsWrapper>
        <ResultsHeader>
          <Number>{results.length}</Number> barbershop{results.length > 1 || results.length === 0 ? 's' : null} near {postcode.toUpperCase()} {area}
        </ResultsHeader>
        <List>
          {this.renderSearchResults()}
        </List>
      </SearchResultsWrapper>
    );
  }
}

export default SearchResults;
