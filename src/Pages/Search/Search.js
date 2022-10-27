import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllRockets } from '../../features/rockets/rocketSlice';

const Search = () => {

    const APIData = useSelector(getAllRockets);
    const { launch_success, upcoming, flight_number, launch_date_local, rocket, links } = APIData;
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchTerm] = useState(["mission_name"]);

    console.log('filtered result', filteredResults);

    useEffect(() => {
        fetch(`https://api.spacexdata.com/v3/launches`)
            .then(res => (res.json()))
            .then(data => {
                // console.log('fdata', data)
                setFilteredResults(data)
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

        <div>
            <h2>Space TechNext</h2>
            <span>-------------------------------------------------------------</span><br />
            <h2>Search and Select Filtering...</h2>
            <input
                placeholder='search'
                onChange={(e) => searchItems(e.target.value)}
            />
            <h5>Total Rendered Items: {filteredResults.length}</h5>


            {/* {searchInput.length > 0 ? (<h2>Search Result</h2>) : (<span></span>)} */}
            {/* <h2>Search Result: {filteredResults.length}</h2> */}

            <div style={{ marginTop: 20 }}>
                {/* {searchInput.length > 0 ? (
                    Object.values(filteredResults).map((item) => {
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
                        )
                    })
                ) : (
                    Object.values(APIData).map((item) => {
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
                        )
                    })
                )} */}

                {

                    Object.values(filteredResults).map((item) => {
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
                        )
                    })

                }
            </div>
        </div>
    );
};

export default Search;