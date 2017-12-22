import React from 'react';

import Aux from '../../hoc/Aux';

const Shop = (props) => (
    <Aux>
        <h3>{props.name}</h3>
        <address>{props.address}</address>
        <span>{props.slug}</span>
    </Aux>
)

export default Shop;
