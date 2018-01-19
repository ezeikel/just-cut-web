import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Search extends Component {
  handleFormInputPostcodeChange = (e) => {
    this.props.onHandleFormInputPostcodeChange(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { postcode } = this.props;
    this.props.onLookupPostcode(postcode);
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
          <span>Lat: {this.props.lat}</span>
          <span>Lng: {this.props.lng}</span>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    postcode: state.search.postcode,
    lat: state.search.lat,
    lng: state.search.lng
  }
);

const mapDispatchToProps = dispatch => (
  {
    onLookupPostcode: (postcode) => dispatch(actions.lookupPostcode(postcode)),
    onHandleFormInputPostcodeChange: (value) => dispatch(actions.handleFormInputPostcodeChange(value))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
