import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      name: '',
      address: ''
    };
  }

  // async componentDidMount() {
  //   const res = await fetch('/users');
  //   const users = await res.json();
  //   this.setState({ users });
  // }

  // <h1>Users</h1>
  // {this.state.users.map(user =>
  //   <div key={user.id}>{user.username}</div>
  //

  async componentDidUpdate() {
     const response = await fetch('/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    });

    const body = await response.json();
    console.log(body); // TODO: Redirect to new slug using React Router
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = this.name.value;
    const address = this.address.value;

    this.setState({name, address});
  }

  render() {
    return (
      <div className="App">
        <form ref={input => this.shopForm = input} onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input ref={(input) => this.name = input} type="text" name="name" onChange={this.handleChange} />
          <label htmlFor="address">Address</label>
          <textarea ref={(input) => this.address = input} name="address" onChange={this.handleChange}></textarea>
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

export default App;
