import React, { Component } from 'react';
import Aux from '../hoc/Aux';

class AddShop extends Component {
    state = {
        name: '',
        address: '',
        users: []
    };

    async componentDidMount() {
        const res = await fetch('/users');
        const users = await res.json();
        
        this.setState({...this.state, users});
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();

        const {name, address} = this.state;
        
        await fetch('/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, address })
        });
        
        this.setState({name: '', address:''});
        // TODO: Redirect to new shops page where new shop will be listed
    }

    render() {
        const users = this.state.users.map(user => <li key={user.id}>{user.username}</li>);
        return (
            <Aux>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    <label htmlFor="address">Address</label>
                    <textarea name="address" value={this.state.address} onChange={this.handleChange}></textarea>
                    <input type="submit" value="Save" />
                </form>
                <div>
                    <h1>Users</h1>
                    <ul>
                        {users}
                    </ul>
                </div>
            </Aux>
        );
    }
}

export default AddShop;
