import React, { Component } from 'react';
import styled from 'styled-components';

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
  render() {
    return (
      <React.Fragment>
        <label htmlFor="postcode">Enter your postcode</label>
        <SearchInputWrapper>
          <SearchInputText type="text" name="postcode" placeholder="e.g. EC4R 3TE" value={this.props.postcode} onChange={this.props.handleChange} />
          <SearchInputSubmit type="submit" value="Find Shops" />
        </SearchInputWrapper>
      </React.Fragment>
    );
  }
}

export default SearchInput;
