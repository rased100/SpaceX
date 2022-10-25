import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';

const Items = ({ allItem }) => {
    const { launch_success, upcoming, launch_date_local: date } = allItem;
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
                <div className="">
                    <img src={img} alt="" className='' />
                </div>
                <div className="">
                    <h5>{name}</h5>
                    <p>Launch Status: {lStatus}</p>
                    <p>Is Upcoming: {lUpComing}</p>
                    <button>See Details</button>
                    <p>launch date: {date}</p>
                </div>
            </div >
        </>
    );
};

export default Items;


{/* <Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={mission_patch_small} />
<Card.Body>
    <Card.Title>{rocket_name}</Card.Title>
    <Card.Text>Launch Status: {lStatus}</Card.Text>
    <Card.Text>Is Upcoming: {lUpComing}</Card.Text>
    <Button variant="primary">See Details</Button>
    <Card.Text>launch date: {launch_date_local}</Card.Text>
</Card.Body>
</Card> */}

{/* <div className="col-md-3" >
                <div className="card text-center">

                    <div className="">
                        <img src={img} alt="" className='card-img-top' />
                    </div>
                    <div className="card-body text-dark">
                        <h5 className="card-title hover text-decoration-underline">{rocket_name}</h5>
                    </div>
                </div>
            </div > */}