import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { setItems } from '../../features/redux/actions/itemActions';
import ItemsComponent from './ItemsComponent';
import { fetchAsyncRockets } from '../../features/rockets/rocketSlice';

const FetchItems = () => {
    // const items = useSelector(getAllRockets);
    // console.log('ritems', items);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncRockets());
    }, [dispatch]);
    // console.log(items);
    return (
        <div>
            <ItemsComponent />
            {/* <p>fi</p> */}
        </div>
    );
};

export default FetchItems;