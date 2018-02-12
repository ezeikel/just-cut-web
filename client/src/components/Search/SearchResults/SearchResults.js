import React, { Component } from 'react';
import SearchResult from './SearchResult/SearchResult';

class SearchResults extends Component {
  renderSearchResults() {
    if (this.props.results.length > 0) {
      return this.props.results.map(shop => (
        <li key={shop.id} className="search-results__list-item">
          <SearchResult id={shop.id} slug={shop.slug} location={shop.location} lng={shop.location.coordinates[0]} lat={shop.location.coordinates[1]} name={shop.name} photo={shop.photo} />
        </li>
      ));
    }
  }

  render() {
    let header;

    if (this.props.results.length > 1) {
      header = <header>{this.props.results.length} barbershops near {this.props.postcode.toUpperCase()} {this.props.area}</header>;
    } else {
      header = <header>{this.props.results.length} barbershop near {this.props.postcode.toUpperCase()} {this.props.area}</header>;
    }

    return (
      <section className="search-results">
        {header}
        <ul className="search-results__list">
          {this.renderSearchResults()}
        </ul>
      </section>
    );
  }
}

export default SearchResults;
