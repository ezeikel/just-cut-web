import React, { Component } from 'react';

class Shops extends Component {
    state = {
        stores: []
    }

    async componentDidMount() {
        let stores = await fetch('/shops');
        stores = await stores.json();
        this.setState({stores});
    }

    render() {
        const stores = this.state.stores.map( store => (
            <div>
                <h3>{store.name}</h3>
                <address>{store.address}</address>
                <span>{store.slug}</span>
            </div>
        ));
        return (
            <div>
                <h2>Shops:</h2>
                {stores}
            </div>
        );     
    }
}

export default Shops;
