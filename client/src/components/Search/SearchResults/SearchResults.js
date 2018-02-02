import React, { Component } from 'react';
import SearchResult from './SearchResult/SearchResult';

class SearchResults extends Component {
  renderSearchResults() {
    if (this.props.results.length > 0) {
      return this.props.results.map(shop => <SearchResult key={shop._id} lng={shop.location.coordinates[0]} lat={shop.location.coordinates[1]} name={shop.name} />);
    }
  }

  render() {
    return (
    <div>
      <header>{this.props.results.length} barbershops in {this.props.postcode.toUpperCase()} Brixton </header>
      {this.renderSearchResults()};
    </div>
    )
  }
}

export default SearchResults;