import React, { Component } from 'react';
//import './Main.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: '',
            address: '',
            users: []
        };
    }

    async componentDidMount() {
        const res = await fetch('/users');
        const users = await res.json();
        this.setState({ ...this.state, users });
    }

    async componentDidUpdate() {
        if (this.state.name === '' || this.state.address === '') return;

        await fetch('/add', {
            method: 'POST',
            headers: {
                'Accept': 'Mainlication/json',
                'Content-Type': 'Mainlication/json'
            },
            body: JSON.stringify({ name: this.state.name, address: this.state.address })
        });

        // TODO: Redirect to new slug returned by BE to new shop slug
    }

    handleSubmit(e) {
        e.preventDefault();

        const name = this.name.value;
        const address = this.address.value;

        this.setState({ ...this.state, name, address });
        this.shopForm.reset();
    }

    render() {
        return (
            <div className="Home">
                <form ref={input => this.shopForm = input} onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input ref={(input) => this.name = input} type="text" name="name" onChange={this.handleChange} />
                    <label htmlFor="address">Address</label>
                    <textarea ref={(input) => this.address = input} name="address" onChange={this.handleChange}></textarea>
                    <input type="submit" value="Save" />
                </form>
                <h1>Users</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.username}</div>
                )}
            </div>
        );
    }
}

export default Home;
