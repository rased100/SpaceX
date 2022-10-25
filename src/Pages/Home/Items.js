import React from 'react';
import { Link } from 'react-router-dom';

const Items = ({ allItem }) => {
    const { launch_success, upcoming, flight_number, launch_date_local: date } = allItem;
    const { mission_patch_small: img } = allItem.links;
    const { rocket_name: name } = allItem.rocket;

    // console.log('ls', launch_success)

    let lStatus;
    if (launch_success) {
        lStatus = 'Success'
    } else {
        lStatus = 'Failed'
    };

    let lUpComing;
    if (upcoming) {
        lUpComing = 'Yes'
    } else {
        lUpComing = 'X'
    }


    return (
        <>
            <div className="col-md-3" >
                <div className="card bg-info text-dark ">
                    <img src={img} className="w-75" alt="" />
                    <div className="card-body">
                        <h5 className=''>{name}</h5>
                        <p>Launch Status: {lStatus}</p>
                        <p>Is Upcoming: {lUpComing}</p>
                        <Link to={`item/${flight_number}`}><button type="button" class="btn btn-warning">See Details</button></Link>
                        <p>launch date: {date}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Items;