import React from 'react';
import { useSelector } from 'react-redux';
import Items from './Items';

const ItemsComponent = () => {
    const items = useSelector((state) => state.allItems.items);
    // console.log(items);
    // const { title } = items[0];
    return (
        <>
            <div>
                <h1>SpaceX Rockets</h1>
                <div>
                    {
                        items.map(allItem => <Items
                            key={allItem.mission_name}
                            allItem={allItem}
                        ></Items>)
                    }
                </div>


            </div>
        </>
    );
};

export default ItemsComponent;