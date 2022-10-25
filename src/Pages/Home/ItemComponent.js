import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectedItem } from '../../features/redux/actions/itemActions';
import ItemDetails from './ItemDetails';

const ItemComponent = () => {
    const item = useSelector((state) => state.item);
    const { itemId } = useParams();
    const dispatch = useDispatch();

    console.log('item', item);


    const fetchItemDetails = async () => {
        const response = await axios.get(`https://api.spacexdata.com/v3/launches/${itemId}`).catch(err => {
            console.log("Err", err);
        });
        dispatch(selectedItem(response.data));
    };
    useEffect(() => {
        if (itemId && itemId !== "") {
            fetchItemDetails();
        }
    }, [itemId]);

    return (
        <ItemDetails item={item}></ItemDetails>
    );
};

export default ItemComponent;