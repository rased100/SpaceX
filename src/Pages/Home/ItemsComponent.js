import React from 'react';
import { useSelector } from 'react-redux';
import { getAllRockets } from '../../features/rockets/rocketSlice';
import Items from './Items';
import Loading from './Loading';

const ItemsComponent = () => {
    const items = useSelector(getAllRockets);
    // console.log(items);

    const keys = Object.keys(items);
    // console.log('key', keys.length);

    return (
        <>
            {keys.length === 0 ? (
                // <div><p>...Loading</p></div>
                <div className="p-5">
                    <Loading></Loading>
                </div>

            ) : (
                <div style={{
                    display: 'none',
                }}>
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
            )}
        </>
    );
};

export default ItemsComponent;