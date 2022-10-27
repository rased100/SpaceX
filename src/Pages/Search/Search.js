import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRockets } from '../../features/rockets/rocketSlice';
import { Card, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Search = () => {

    const APIData = useSelector(getAllRockets);
    const { launch_success, upcoming, flight_number, launch_date_local, rocket, links, mission_name } = APIData;
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm] = useState(["mission_name"]);

    // console.log('filtered result', filteredResults);
    // console.log('searchInput1', searchInput);
    // console.log('searchInput2', typeof (searchInput));

    useEffect(() => {
        fetch(`https://api.spacexdata.com/v3/launches`)
            .then(res => (res.json()))
            .then(data => {
                // console.log('fdata', data)
                setFilteredResults(data);
            });



    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)

        if (searchInput !== '') {
            const filteredData = Object.values(APIData).filter((item) => {
                return searchTerm.some((newItem) => {
                    return (
                        item[newItem]
                            ?.toString()
                            .toLowerCase()
                            .indexOf(searchInput.toLowerCase()) > -1
                    );
                });
            })
            console.log('filterdData', filteredData);
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }

    return (

        <>
            <div className='bg-success'>
                <div className='mb-0'>
                    <h1 className='text-warning fw-bold p-3' style={{ fontSize: '45px' }}>Space TechNext</h1>
                    <h2 className='text-white pt-3' style={{ fontSize: '26px' }}>Search and Select Filtering...</h2>

                    {/* Search Options Start */}

                    {/* search by name */}
                    <InputGroup className="mb-3 w-25">
                        <Form.Control
                            placeholder="Srarch by Rocket Name"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e) => searchItems(e.target.value)}
                        />
                    </InputGroup>

                    {/* Lunch Date */}
                    <Form.Select className="mb-3 w-25" aria-label="Default select example">
                        <option>Lunch Date</option>
                        <option value="1">Last Week</option>
                        <option value="2">Last Month</option>
                        <option value="3">Last Year</option>
                        <option value="4">Last 5 Years</option>
                    </Form.Select>

                    {/* Lunch Status */}
                    <Form.Select className="mb-3 w-25" aria-label="Default select example">
                        <option>Lunch Status</option>
                        <option value="1">Success</option>
                        <option value="2">Failure</option>
                    </Form.Select>

                    {/* Is Upcoming */}
                    <Form.Select className="mb-3 w-25" aria-label="Default select example">
                        <option>Is Upcoming</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </Form.Select>

                    {/* Search Options End */}

                    <h5 className='text-white mb-0 p-5'>Total Rendered Items: <span className='bg-info p-1 rounded-pill'>{filteredResults.length}</span></h5>
                </div>
                <div>
                    <div className='container'>
                        <div className='row'>
                            {
                                Object.values(filteredResults).map((item, key = { mission_name }) => {
                                    const { launch_success, upcoming, flight_number, launch_date_local, rocket, links } = item;
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
                                        <div className='col-md-3 p-4 bg-dark' key={key}>
                                            <Card style={{ width: '80%' }} className="bg-secondary">
                                                <Card.Img variant="top" src={links.mission_patch_small} />
                                                <Card.Body>
                                                    <Card.Title className='text-warning'>{rocket.rocket_name}</Card.Title>
                                                    <Card.Text className='text-info'>Launch Status: {lStatus}</Card.Text>
                                                    <Card.Text className='text-info'>Is Upcoming: {lUpComing}</Card.Text>
                                                    <Link to={`item/${flight_number}`}> <Button variant="warning">See Details</Button></Link>
                                                    <Card.Text className='text-info'>launch date: <br /> {launch_date_local}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;