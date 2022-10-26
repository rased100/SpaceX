import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ItemsComponent from './ItemsComponent';
import { fetchAsyncRockets } from '../../features/rockets/rocketSlice';

const FetchItems = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncRockets());
    }, [dispatch]);


    return (
        <div>
            <ItemsComponent />
        </div>
    );
};

export default FetchItems;