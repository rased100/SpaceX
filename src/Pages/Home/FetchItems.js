import React from 'react';
import { useSelector } from 'react-redux';
import ItemsComponent from './ItemsComponent';

const FetchItems = () => {
    const items = useSelector((state) => state);
    // console.log(items);
    return (
        <div>
            <ItemsComponent />
        </div>
    );
};

export default FetchItems;