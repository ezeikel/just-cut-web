import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as actions from '../../store/actions/index';

import SearchInput from './SearchInput/SearchInput';
import SearchResults from './SearchResults/SearchResults';

const SearchWrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-large);
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: var(--spacing-medium);
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
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchInput postcode={this.props.postcode} handleChange={this.handleFormInputPostcodeChange} />
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
    onHandleFormInputPostcodeChange: (value) => dispatch(actions.handleFormInputPostcodeChange(value)),
    onLookupPostcode: (postcode) => dispatch(actions.lookupPostcode(postcode))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
