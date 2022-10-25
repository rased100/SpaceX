import React from 'react';
import { useParams } from 'react-router-dom';

const Item = () => {
    const { itemId } = useParams();
    console.log(itemId)
    return (
        <div>
            <h2>Single Item</h2>
        </div>
    );
};

export default Item;