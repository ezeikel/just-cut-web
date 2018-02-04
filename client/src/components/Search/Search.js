import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import SearchResults from './SearchResults/SearchResults';

class Search extends Component {
  state = {
    valid: true,
    submitted: false
  }

  validatePostcode = async (postcode) => {
    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`);
    const data = await response.json();
    return data.result;
  }

  handleFormInputPostcodeChange = (e) => {
    this.props.onHandleFormInputPostcodeChange(e.target.value);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { postcode } = this.props;
    const valid = await this.validatePostcode(postcode);

    this.setState({ valid, submitted: true });

    if (this.state.valid) {
      this.props.onLookupPostcode(postcode);
    }
  }

  renderSearchResults() {
    if (!this.state.valid && this.state.submitted) {
      return <div><p>Oops, that doesn't seem like a valid postcode. Are you sure you're entering it correctly (for example, W1T 6PZ)?</p></div>;
    } else if (this.state.valid && this.state.submitted) {
      return <SearchResults postcode={this.props.postcode} area={this.props.area} results={this.props.results} />
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="landing-page-search">
          <label className="landing-page-search__search-label" htmlFor="postcode">Enter your postcode</label>
          <div className="landing-page-search__input">
            <input type="text" name="postcode" className="search-input" placeholder="e.g. EC4R 3TE" autoComplete="on" value={this.props.postcode} onChange={this.handleFormInputPostcodeChange} />
            <input type="submit" />
          </div>
        </form>
        <section>
          {this.renderSearchResults()}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    postcode: state.search.postcode,
    area: state.search.area,
    lat: state.search.lat,
    lng: state.search.lng,
    results: state.search.results
  }
);

const mapDispatchToProps = dispatch => (
  {
    onLookupPostcode: (postcode) => dispatch(actions.lookupPostcode(postcode)),
    onHandleFormInputPostcodeChange: (value) => dispatch(actions.handleFormInputPostcodeChange(value))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
