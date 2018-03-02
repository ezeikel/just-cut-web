import React, { Component } from 'react';
import styled from 'styled-components';

import Aux from '../../../hoc/Aux/Aux';
import searchIcon from '../../../assets/icons/search.svg';

const SearchInputText = styled.input`
  height: 100%;
  padding: 13px 16px;
  margin: 0;
  border: 0;
  text-transform: uppercase;
`;

const SearchInputSubmit = styled.input`
  display: block;
  height: 100%;
  width: 100%;
  padding: 16px 32px;
  background-color: var(--color-primary);
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: center;
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
      <Aux>
        <div>{this.props.handleFormInputPostcodeChange}</div>
        <label htmlFor="postcode">Enter your postcode {this.props.test}</label>
        <SearchInputWrapper>
          <SearchInputText type="text" name="postcode" placeholder="e.g. EC4R 3TE" value={this.props.postcode} onChange={this.props.handleChange} />
          <SearchInputSubmit type="submit" value="Find Shops" />
        </SearchInputWrapper>
      </Aux>
    );
  }
}

export default SearchInput;
