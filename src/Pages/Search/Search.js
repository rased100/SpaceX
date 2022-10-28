import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRockets } from '../../features/rockets/rocketSlice';
import { Card, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactPaginate from 'react-paginate';

const Search = () => {

    const APIData = useSelector(getAllRockets);
    const { launch_success, upcoming, flight_number, launch_date_local, rocket, links, mission_name } = APIData;
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchTeam] = useState(["mission_name"]);
    const [searchTeamLs] = useState(["launch_success"]);
    const [searchTeamUc] = useState(["upcoming"]);

    useEffect(() => {
        fetch(`https://api.spacexdata.com/v3/launches`)
            .then(res => (res.json()))
            .then(data => {
                // console.log('fdata', data)
                setFilteredResults(data);
            });
    }, []);



    // search name
    const searchItemsBtn = (searchValue) => {
        if (searchValue !== '') {
            const filteredData = Object.values(filteredResults).filter((item) => {
                return searchTeam.some((newItem) => {
                    return (
                        item[newItem]
                            ?.toString()
                            .toLowerCase()
                            .indexOf(searchValue.toLowerCase()) > -1
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

    // last 5/1/month/week-----------------------------------------------------
    const lastFiveYears = Object.values(filteredResults).filter((item) => {
        return new Date().getFullYear() - item.launch_year <= 5;
    });

    const lastYear = Object.values(filteredResults).filter((item) => {
        return new Date().getFullYear() - item.launch_year <= 1;
    });


    const lunchDateBtn = (searchValue) => {
        if (searchValue == 4) {
            setFilteredResults(lastFiveYears);
            // console.log('lastFiveYears', lastFiveYears)
        } else if (searchValue == 3) {
            setFilteredResults(lastYear);
        } else if (searchValue == 2) {
            setFilteredResults([]);
            // There is no result of last Year
            // so this will be empty also
        } else if (searchValue == 1) {
            setFilteredResults([]);
            // There is no result of last Year
            // so this will be empty also
        } else {
            setFilteredResults(APIData)
        }
    };
    // last 5/1/month/week----End


    // lunch status------------------------------------------------------------
    const lunchStatusBtn = (searchValue) => {
        if (searchValue == 'true') {
            setFilteredResults(SuccessData)
        } else if (searchValue == 'false') {
            setFilteredResults(FailureData)
        } else {
            setFilteredResults(APIData)
        }
    };

    const SuccessData = Object.values(filteredResults).filter((item) => {
        const searchFor = 'true';
        return searchTeamLs.some((newItem) => {
            return (
                item[newItem]
                    ?.toString()
                    .toLowerCase()
                    .indexOf(searchFor.toLowerCase()) > -1
            );
        });
    });

    const FailureData = Object.values(filteredResults).filter((item) => {
        const searchFor = 'false';
        return searchTeamLs.some((newItem) => {
            return (
                item[newItem]
                    ?.toString()
                    .toLowerCase()
                    .indexOf(searchFor.toLowerCase()) > -1
            );
        });
    });


    // UpComming----------------------------------------------------------
    const isUpcomingBtn = (searchValue) => {
        if (searchValue == 'true') {
            setFilteredResults(YesData)
        } else if (searchValue == 'false') {
            setFilteredResults(NoData)
        } else {
            setFilteredResults(APIData)
        }
    };

    const YesData = Object.values(filteredResults).filter((item) => {
        const searchFor = 'true';
        return searchTeamUc.some((newItem) => {
            return (
                item[newItem]
                    ?.toString()
                    .toLowerCase()
                    .indexOf(searchFor.toLowerCase()) > -1
            );
        });
    });

    const NoData = Object.values(filteredResults).filter((item) => {
        const searchFor = 'false';
        return searchTeamUc.some((newItem) => {
            return (
                item[newItem]
                    ?.toString()
                    .toLowerCase()
                    .indexOf(searchFor.toLowerCase()) > -1
            );
        });
    });


    // Pagination---------------------------------------------
    const data = filteredResults;
    const [pageNumber, setPageNumber] = useState(0);
    const [itemPerPage, setItemPerPage] = useState(8);
    const pageVisited = pageNumber * itemPerPage;
    const pageCount = Math.ceil(filteredResults.length / itemPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const displayItems = <>
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
                        <option value='true'>Success</option>
                        <option value='false'>Failure</option>
                    </Form.Select>

                    {/* Is Upcoming */}
                    <Form.Select
                        className="ms-3"
                        aria-label="Default select example"
                        onChange={(e) => isUpcomingBtn(e.target.value)}
                    >
                        <option>Is Upcoming</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Select>
                </div>
                {/* Search Options End */}

                <h5 className='text-white mb-0 p-5'>Total Rendered Items: <span className='bg-info p-1 rounded-pill'>{filteredResults.length}</span></h5>
            </div>
            <div className='bg-dark'>
                <div className='container'>
                    <div className='row'>
                        {
                            Object.values(filteredResults).slice(pageVisited, pageVisited + itemPerPage).map((item, key = { mission_name }) => {
                                const { launch_success, upcoming, flight_number, launch_date_local, rocket, links } = item;

                                let lStatus;
                                if (launch_success) {
                                    lStatus = <i className="fa-solid fa-check-double text-success"></i>
                                } else {
                                    lStatus = <i className="fa-solid fa-square-xmark text-danger"></i>
                                };

                                let lUpComing;
                                if (upcoming) {
                                    lUpComing = <i className="fa-solid fa-check-double text-success"></i>
                                } else {
                                    lUpComing = <i className="fa-solid fa-square-xmark text-danger"></i>
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

    return (
        <div className='bg-dark mb-5'>
            {displayItems}
            <div className='d-flex justify-content-around mt-5'>
                <div className='d-flex  p-2 '>
                    <p className='text-light px-2'>How many items in a page:</p>
                    <select onChange={e => setItemPerPage(e.currentTarget.value)} name="cars" id="cars" className='rounded px-2' value="8">
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                    </select>
                </div>
                <ReactPaginate
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    // classes
                    containerClassName={"pagination"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"active"}
                    nextClassName={"page-item"}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={1}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                />
            </div>
        </div>
    );
};

export default Search;