import React from 'react';
import { useSelector } from 'react-redux';

const ItemsComponent = () => {
    const items = useSelector((state) => state.allItems.items);
    console.log(items);
    const { title } = items[0];
    return (
        <div>
            <h2>ItemsComponent1 {title}</h2>
        </div>
    );
};

export default ItemsComponent;