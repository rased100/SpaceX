import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { removeSelectedItem, selectedItem } from '../../features/redux/actions/itemActions';

const ItemComponent = () => {
    const item = useSelector((state) => state.item);
    const { mission_name, rocket, links, launch_failure_details, details } = item;


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
        return () => {
            dispatch(removeSelectedItem());
        }
    }, [itemId]);

    return (
        <>
            {keys.length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div className="card bg-info text-dark ">
                    <img src={links?.mission_patch_small || 'not found'} className="w-75" alt="" />
                    <div className="card-body">
                        <h4>Mission Name: {mission_name || 'not found'}</h4>
                        <h2>{rocket?.rocket_name || 'not found'}</h2>
                        <p>Launch Failure Details: {launch_failure_details?.reason || 'not found'}</p>
                        <p>Details: {details || 'not found'}</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ItemComponent;