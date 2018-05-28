import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Register extends Component {
  state = {
    email: '',
    fullName: '',
    username: '',
    password: '',
    passwordConfirm: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onRegisterUser(this.state.email, this.state.fullName, this.state.username, this.state.password, this.state.passwordConfirm);

    // reset form
    this.setState({
      email: '',
      fullName: '',
      username: '',
      password: '',
      passwordConfirm: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Register</h2>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
        <label htmlFor="fullName">Full Name</label>
        <input type="text" name="fullName" value={this.state.fullName} onChange={this.handleChange} />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
        <label htmlFor="passwordConfirm">Password Confirm</label>
        <input type="text" name="passwordConfirm" value={this.state.passwordConfirm} onChange={this.handleChange} />
        <input type="submit" value="login" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    onRegisterUser: (email, fullName, username, password, passwordConfirm) => dispatch(actions.registerUser(email, fullName, username, password, passwordConfirm))
  }
);

export default connect(null, mapDispatchToProps)(Register);
