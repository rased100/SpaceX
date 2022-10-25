import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Items from './Items';

const ItemsComponent = () => {
    const items = useSelector((state) => state.allItems.items);
    // console.log(items);
    // const { title } = items[0];
    return (
        <>
            <div className="">
                <h1 className="">SpaceX Rockets</h1>
                {
                    items.map(allItem => <Items
                        key={allItem.mission_name}
                        allItem={allItem}
                    ></Items>)
                }

            </div>
        </>
    );
};

export default ItemsComponent;