import React from 'react';
import { Link } from 'react-router-dom';

const Items = ({ allItem }) => {
    const { launch_success, upcoming, flight_number, launch_date_local, rocket, links } = allItem;

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
                    <img src={links.mission_patch_small} className="w-75" alt="" />
                    <div className="card-body">
                        <h5 className=''>{rocket.rocket_name}</h5>
                        <p>Launch Status: {lStatus}</p>
                        <p>Is Upcoming: {lUpComing}</p>
                        <Link to={`item/${flight_number}`}><button type="button" className="btn btn-warning">See Details</button></Link>
                        <p>launch date: {launch_date_local}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Items;