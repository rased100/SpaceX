import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../features/redux/actions/itemActions';
import ItemsComponent from './ItemsComponent';

const FetchItems = () => {
    const items = useSelector((state) => state);
    // console.log(items);
    const dispatch = useDispatch();


    const fetchItems = async () => {
        const response = await axios
            .get("https://api.spacexdata.com/v3/launches")
            .catch((err) => {
                console.log("Err", err);
            });
        dispatch(setItems(response.data));
    };
    useEffect(() => {
        fetchItems();
    }, []);
    // console.log(items);
    return (
        <div>
            <ItemsComponent />
        </div>
    );
};

export default FetchItems;