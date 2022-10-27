import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRockets } from '../../features/rockets/rocketSlice';
import { Card } from 'react-bootstrap';

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

        <div className='bg-success'>
            <h2>Space TechNext</h2>
            <span>-------------------------------------------------------------</span><br />
            <h2>Search and Select Filtering...</h2>
            <input
                placeholder='search'
                onChange={(e) => searchItems(e.target.value)}
            />
            <h5>Total Rendered Items: {filteredResults.length}</h5>

            <div>
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
                            <>
                                <div className='col-md-3 p-4 bg-dark'>
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
                            </>
                        )
                    })

                }
            </div>
        </div>
    );
};

export default Search;