import React, { Component } from 'react';
import styled from 'styled-components';

import Aux from '../../../hoc/Aux/Aux';
import searchIcon from '../../../assets/icons/search.svg';

const SearchInputText = styled.input`
  height: 45px;
  padding: var(--spacing-small) !important; //TODO: Fix specifity
  margin: 0 !important;
  border: none;
  text-transform: uppercase;
`;

const SearchInputSubmit = styled.input`
  display: block;
  height: 45px;
  width: 100%;
  padding: var(--spacing-small) !important;
  margin: 0 !important;
  border: none !important;
  background-color: var(--color-primary);
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 18px;
  cursor: pointer;
  color: var(--color-white);
  transition: background-color 0.3s ease-in-out;
  text-transform: uppercase;
  text-indent: -9999em;
  @media (min-width: 768px) {
    text-indent: 0;
    background-image: none;
  }
`;

const SearchInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(60px, auto);
`;

class SearchInput extends Component {
  useCurrentLocation = () => {
    if ('geolocation' in navigator) {
      console.log('Checking current location...');
      navigator.geolocation.getCurrentPosition((
        position => console.log({ lat: position.coords.latitude, lng: position.coords.longitude }), // TODO: Trigger handleChange or postcode
        () => console.log('Sorry, no position available.')
      ));
    } else {
      console.log('geolocation is not available.');
    }
  }

  render() {
    return (
      <Aux>
        <label htmlFor="postcode">Enter your postcode {this.props.test}</label>
        <span onClick={this.useCurrentLocation}>Or use current location</span>
        <SearchInputWrapper>
          <SearchInputText type="text" name="postcode" placeholder="e.g. EC4R 3TE" value={this.props.postcode} onChange={this.props.handleChange} />
          <SearchInputSubmit type="submit" value="Find Shops" />
        </SearchInputWrapper>
      </Aux>
    );
  }
}

export default SearchInput;
