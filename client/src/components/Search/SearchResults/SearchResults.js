import React, { Component } from 'react';
import styled from 'styled-components';

import SearchResult from './SearchResult/SearchResult';

const SearchResultsWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: var(--spacing-large);
  .search-results {
    &__header {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: var(--spacing-medium);
      align-items: center;
    }
    &__list {
      display: grid;
      grid-row-gap: var(--spacing-large);
      white-space: nowrap;
    }
    &__number {
      font-size: 32px;
    }
  }
`;

class SearchResults extends Component {
  renderSearchResults() {
    if (this.props.results.length > 0) {
      return this.props.results.map(shop => (
        <li key={shop._id} className="search-results__list-item">
          <SearchResult id={shop._id} slug={shop.slug} location={shop.location} distance={shop.distance} lng={shop.location.coordinates[0]} lat={shop.location.coordinates[1]} name={shop.name} photo={shop.photo} tags={shop.tags} priceLevel={shop.priceLevel} ratings={shop.ratings} />
        </li>
      ));
    }
  }

  render() {
    let header;

    if (this.props.results.length > 1) {
      header = <header className="search-results__header"><span className="search-results__number">{this.props.results.length}</span> barbershops near {this.props.postcode.toUpperCase()} {this.props.area}</header>;
    } else {
      header = <header className="search-results__header"><span className="search-results__number">{this.props.results.length}</span> barbershop near {this.props.postcode.toUpperCase()} {this.props.area}</header>;
    }

    return (
      <SearchResultsWrapper className="search-results">
        {header}
        <ul className="search-results__list">
          {this.renderSearchResults()}
        </ul>
      </SearchResultsWrapper>
    );
  }
}

export default SearchResults;
