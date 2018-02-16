import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../store/actions/index';

import SearchResults from './SearchResults/SearchResults';

const SearchWrapper = styled.div`
  display: grid;
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: var(--spacing-medium);
`;

const InputText = styled.input`
  height: 45px;
  padding: 13px 16px;
  border: 0;
  text-transform: uppercase;
`;

const InputSubmit = styled.input`
  display: block;
  height: 100%;
  width: 100%;
  padding: 15px 90px;
  background-color: var(--color-primary);
  color: var(--color-white);
  transition: background-color 0.3s ease-in-out;
  text-transform: uppercase;
`;

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
      return <SearchResults postcode={this.props.postcode} area={this.props.area} results={this.props.results} />;
    }

    return null;
  }

  render() {
    return (
      <SearchWrapper>
        <SearchForm onSubmit={this.handleSubmit} className="landing-page-search">
          <label className="landing-page-search__search-label" htmlFor="postcode">Enter your postcode</label>
          <div className="landing-page-search__input">
            <InputText type="text" name="postcode" className="search-input" placeholder="e.g. EC4R 3TE" autoComplete="on" value={this.props.postcode} onChange={this.handleFormInputPostcodeChange} />
            <InputSubmit type="submit" value="search" />
          </div>
        </SearchForm>
        <section>
          {this.renderSearchResults()}
        </section>
      </SearchWrapper>
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
