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
    // const [searchTeamString, setSearchTeamString] = useState('');
    // const searchStringText = "launch_success";
    // const [searchTeam] = useState([searchTeamString]);
    const [searchTeam] = useState(["mission_name"]);
    const [searchTeamLs] = useState(["launch_success"]);
    const [searchTeamUc] = useState(["upcoming"]);



    // console.log('searchTeamString', typeof (searchTeamString));
    // console.log('APIData', APIData);
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

    // search name
    const searchItemsBtn = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = Object.values(APIData).filter((item) => {
                return searchTeam.some((newItem) => {
                    return (
                        item[newItem]
                            ?.toString()
                            .toLowerCase()
                            .indexOf(searchInput.toLowerCase()) > -1
                    );
                });
            })
            // console.log('filterdData', filteredData);
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    };



    // lunch status
    const lunchStatusBtn = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = Object.values(APIData).filter((item) => {
                return searchTeamLs.some((newItem) => {
                    return (
                        item[newItem]
                            ?.toString()
                            .toLowerCase()
                            .indexOf(searchInput.toLowerCase()) > -1
                    );
                });
            })
            // console.log('filterdData', filteredData);
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    };


    // UpComming
    const isUpcomingBtn = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = Object.values(APIData).filter((item) => {
                return searchTeamUc.some((newItem) => {
                    return (
                        item[newItem]
                            ?.toString()
                            .toLowerCase()
                            .indexOf(searchInput.toLowerCase()) > -1
                    );
                });
            })
            // console.log('filterdData', filteredData);
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    };

    // last 5/1 Years------------------------------------------------------Start


    // let today = new Date();
    // console.log('today', today.toLocaleString());

    // let lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
    // let lastYearEnd = new Date(today.getFullYear(), 0, 1);

    // console.log('lastYearStart', lastYearStart.toLocaleString());
    // console.log(lastYearEnd.toLocaleString());

    // ----------------------------------------------

    const lastFiveYears = Object.values(APIData).filter(function (item) {
        // const yearString = item.launch_year;
        // const StrinsToNum = parseFloat(yearString);
        // console.log('snum', StrinsToNum);
        // const gYear = new Date().getFullYear();
        // console.log('gYear', gYear);
        return new Date().getFullYear() - item.launch_year <= 5;
    });

    const lastYear = Object.values(APIData).filter(function (item) {
        return new Date().getFullYear() - item.launch_year <= 1;
    });


    const lunchDateBtn = (searchValue) => {
        if (searchValue == 4) {
            setFilteredResults(lastFiveYears);
            // setFilteredResults(Object.values(lastFiveYears));
            console.log('lastFiveYears', lastFiveYears)
        } else if (searchValue == 3) {
            setFilteredResults(lastYear);
        } else {
            setFilteredResults(APIData)
        }
    }



    // last 5/1 Years------------------------------------------------------End



    return (

        <>
            <div className='bg-success'>
                <div className='mb-0'>
                    <h1 className='text-warning fw-bold p-3' style={{ fontSize: '45px' }}>Space TechNext</h1>
                    <h2 className='text-white pt-3' style={{ fontSize: '28px' }}>Search and Select Filtering...</h2>

                    {/* Search Options Start */}
                    <div className='container d-flex'>
                        {/* search by name */}
                        <InputGroup>
                            <Form.Control
                                placeholder="Srarch by Rocket Name"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={(e) => searchItemsBtn(e.target.value)}
                            />
                        </InputGroup>

                        {/* Lunch Date */}
                        <Form.Select
                            className="ms-3"
                            aria-label="Default select example"
                            onChange={(e) => lunchDateBtn(e.target.value)}
                        >
                            <option>Lunch Date</option>
                            <option value="1">Last Week</option>
                            <option value="2">Last Month</option>
                            <option value="3">Last Year</option>
                            <option value="4">Last 5 Years</option>
                        </Form.Select>

                        {/* Lunch Status */}
                        <Form.Select
                            className="ms-3"
                            aria-label="Default select example"
                            onChange={(e) => lunchStatusBtn(e.target.value)}
                        >
                            <option>Lunch Status</option>
                            <option value='false'>Success</option>
                            <option value='true'>Failure</option>
                        </Form.Select>

                        {/* Is Upcoming */}
                        <Form.Select
                            className="ms-3"
                            aria-label="Default select example"
                            onChange={(e) => isUpcomingBtn(e.target.value)}
                        >
                            <option>Is Upcoming</option>
                            <option value="false">Yes</option>
                            <option value="true">No</option>
                        </Form.Select>
                    </div>
                    {/* Search Options End */}

                    <h5 className='text-white mb-0 p-5'>Total Rendered Items: <span className='bg-info p-1 rounded-pill'>{filteredResults.length}</span></h5>
                </div>
                <div className='bg-dark'>
                    <div className='container'>
                        <div className='row'>
                            {
                                Object.values(filteredResults).map((item, key = { mission_name }) => {
                                    const { launch_success, upcoming, flight_number, launch_date_local, rocket, links } = item;

                                    let lStatus;
                                    if (launch_success) {
                                        lStatus = <i class="fa-solid fa-check-double text-success"></i>
                                    } else {
                                        lStatus = <i class="fa-solid fa-square-xmark text-danger"></i>
                                    };

                                    let lUpComing;
                                    if (upcoming) {
                                        lUpComing = <i class="fa-solid fa-check-double text-success"></i>
                                    } else {
                                        lUpComing = <i class="fa-solid fa-square-xmark text-danger"></i>
                                    }


                                    return (
                                        <div className='col-md-3 p-4' key={key}>
                                            <Card className="bg-secondary">
                                                <Card.Img className='mx-auto w-50 pt-1' variant="top" src={links.mission_patch_small} />
                                                <Card.Body>
                                                    <Card.Title className='text-warning'>{rocket.rocket_name}</Card.Title>
                                                    <Card.Text className='text-info'>Launch Status: {lStatus}</Card.Text>
                                                    <Card.Text className='text-info'>Is Upcoming: {lUpComing}</Card.Text>
                                                    <Link to={`item/${flight_number}`}> <Button className='mb-2' variant="warning">See Details</Button></Link>
                                                    <Card.Text className='text-info border-top   border-dark border-opacity-25'>launch date: <br /> {launch_date_local}</Card.Text>
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