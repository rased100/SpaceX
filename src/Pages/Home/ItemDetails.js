import React from 'react';

const ItemDetails = ({ item }) => {
    const { launch_success, upcoming, flight_number, launch_date_local: date } = item;
    const { mission_patch_small: img } = item.links;
    const { rocket_name: name } = item.rocket;

    return (
        <div>
            <div className="card bg-info text-dark ">
                <img src={img} className="w-75" alt="" />
                <div className="card-body">
                    <h5 className=''>{name}</h5>
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;