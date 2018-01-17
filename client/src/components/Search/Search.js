import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <form method="get" className="landing-page-search">
        <label className="landing-page-search__search-label" htmlFor="postcode">Enter your postcode</label>
        <div className="landing-page-search__input">
          <input type="text" name="postcode" className="search-input" placeholder="e.g. EC4R 3TE" autoComplete="on" />
          <input type="submit" />
        </div>
      </form>
    );
  }
}

export default Search;
