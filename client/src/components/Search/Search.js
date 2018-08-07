import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../store/actions/index';
import SearchInput from '../../containers/SearchInput/SearchInput';
import SearchResults from '../../containers/SearchResults/SearchResults';
import spinnerIcon from '../../assets/icons/spinner.svg';

const SearchWrapper = styled.div`
  display: grid;
  grid-row-gap: var(--spacing-large);
`;

const SearchForm = styled.form`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: var(--spacing-medium);
`;

const Spinner = styled.div`
  height: 100px;
  background-image: url(${spinnerIcon});
  background-repeat: no-repeat;
  background-position: center;
`;

const CurrentLocation = styled.button`
  display: grid;
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

      console.log('Checking current location...');
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
      return <div><p>Oops, that doesn't seem like a valid postcode. Are you sure you're entering it correctly (for example, W1T 6PZ)?</p></div>;
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
        </SearchForm>
        <CurrentLocation onClick={this.useCurrentLocation}>Or use current location {this.state.loadingCurrentLocation ? <Spinner /> : ''}</CurrentLocation>
        <section>
          {this.props.loading ? <Spinner /> : this.renderSearchResults()}
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
