import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../features/redux/actions/itemActions';
import ItemsComponent from './ItemsComponent';

const FetchItems = () => {
    const items = useSelector((state) => state);
    // console.log(items);
    const dispatch = useDispatch();


    useEffect(() => {
        fetch(`https://api.spacexdata.com/v3/launches`)
            .then(res => res.json())
            .then(data => {
                dispatch(setItems(data))
                console.log('data', data)
            })
    }, [])
    return (
        <div>
            <ItemsComponent />
        </div>
    );
};

export default FetchItems;