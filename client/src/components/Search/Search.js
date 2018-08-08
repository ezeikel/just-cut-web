import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../store/actions/index';
import SearchInput from '../../containers/SearchInput/SearchInput';
import SearchResults from '../../containers/SearchResults/SearchResults';
import Spinner from '../../containers/Spinner/Spinner';

const SearchWrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-large);
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: var(--spacing-medium);
  max-width: 550px;
`;

const CurrentLocation = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--spacing-medium);
  align-items: center;
  color: var(--color-black);
  cursor: pointer;
  > span {
    text-decoration: underline;
  }
`;

const InvalidPostcode = styled.div`
  max-width: 550px;
  text-align: left;
`;

class Search extends Component {
  state = {
    valid: true,
    loadingCurrentLocation: false
  };

  useCurrentLocation = (e) => {
    e.preventDefault();
    if ('geolocation' in navigator) {
      this.setState({
        loadingCurrentLocation: true
      });

      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      };
      const success = async ({ coords }) => {
        const lat = coords.latitude;
        const lng = coords.longitude;

        this.props.onLookupCoordinates(lat, lng);
        this.props.onSearchSubmit();
        this.setState({
          loadingCurrentLocation: false
        });
      };
      const error = err => console.warn(`ERROR(${err.code}): ${err.message}`);

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      console.log('geolocation is not available.');
    }
  }

  validatePostcode = async (postcode) => {
    const response = await fetch(`https://api.postcodes.io/postcodes/${postcode.toLowerCase()}/validate`);
    const data = await response.json();
    return data.result;
  }

  handleFormInputPostcodeChange = (e) => {
    this.props.onHandleFormInputPostcodeChange(e.target.value);

    if (this.props.results.length > 0) {
      this.props.onSearchClear();
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { postcode } = this.props;
    const valid = await this.validatePostcode(postcode);

    this.props.onSearchSubmit();
    this.setState({
      valid,
      loadingCurrentLocation: false
    });

    if (this.state.valid) {
      this.props.onLookupPostcode(postcode);
    }
  }

  renderSearchResults() {
    if (!this.state.valid && this.props.submitted) {
      return <InvalidPostcode><p>Oops, that doesn't seem like a valid postcode. Are you sure you're entering it correctly (for example, W1T 6PZ)?</p></InvalidPostcode>;
    } else if (this.state.valid && this.props.submitted) {
      return <SearchResults postcode={this.props.postcode} area={this.props.area} results={this.props.results} />;
    }

    return null;
  }

  render() {
    return (
      <SearchWrapper>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchInput postcode={this.props.postcode} handleChange={this.handleFormInputPostcodeChange} />
          <CurrentLocation onClick={this.useCurrentLocation}><span>Use current location</span> {this.state.loadingCurrentLocation ? <Spinner /> : null}</CurrentLocation>
        </SearchForm>
        {this.props.loading ? <Spinner /> : this.renderSearchResults()}
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
    loading: state.search.loading,
    submitted: state.search.submitted,
    results: state.search.results
  }
);

const mapDispatchToProps = dispatch => (
  {
    onHandleFormInputPostcodeChange: (value) => dispatch(actions.handleFormInputPostcodeChange(value)),
    onLookupPostcode: (postcode) => dispatch(actions.lookupPostcode(postcode)),
    onSearchSubmit: () => dispatch(actions.searchSubmit()),
    onSearchClear: () => dispatch(actions.searchClear()),
    onLookupCoordinates: (lat, lng) => dispatch(actions.lookupCoordinates(lat, lng))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
