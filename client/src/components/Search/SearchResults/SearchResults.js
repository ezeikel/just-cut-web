import React, { Component } from 'react';
import SearchResult from './SearchResult/SearchResult';

class SearchResults extends Component {
  renderSearchResults() {
    if (this.props.results.length > 0) {
      return this.props.results.map(shop => <SearchResult key={shop._id} id={shop._id} lng={shop.location.coordinates[0]} lat={shop.location.coordinates[1]} name={shop.name} photo={shop.photo} />);
    }
  }

  render() {
    let header;

    if (this.props.results.length > 1) {
      header = <header>{this.props.results.length} barbershops near {this.props.postcode.toUpperCase()} {this.props.area}</header>
    } else {
      header = <header>{this.props.results.length} barbershop near {this.props.postcode.toUpperCase()} {this.props.area}</header>
    }

    return (
    <div>
      {header}
      {this.renderSearchResults()};
    </div>
    )
  }
}

export default SearchResults;
