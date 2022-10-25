import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectedItem } from '../../features/redux/actions/itemActions';

const ItemComponent = () => {
    const item = useSelector((state) => state.item);
    const { itemId } = useParams();
    const dispatch = useDispatch();

    const keys = Object.keys(item);
    // console.log('key', keys.length);

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
        <>
            {keys.length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div className="card bg-info text-dark ">
                    <img src={item.links.mission_patch_small} className="w-75" alt="" />
                    <div className="card-body">
                        <h5 className=''>{item.flight_number}</h5>
                    </div>
                </div>
            )}
        </>
    );
};

export default ItemComponent;