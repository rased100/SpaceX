import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllRockets } from '../../features/rockets/rocketSlice';
import SearchResult from './SearchResult';

const Header = () => {

    const myiIems = useSelector(getAllRockets);

    // console.log('myItems', myiIems);

    const [q, setQ] = useState("");
    const [searchTerm] = useState(["mission_name"]);

    const search = (items) => {
        return Object.values(items).filter((item) => {
            return searchTerm.some((newItem) => {
                return (
                    item[newItem]
                        ?.toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });
    };


    return (
        <>
            <div>
                <div className='bg-success'>
                    <a className='fs-3' href="/">Space TechNext</a>
                    <h4>Search and Select Filtering...</h4>
                    <span>
                        <input
                            type="text"
                            placeholder="search by mission name"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </span>
                    <h4>Total Rendered Items:</h4>
                </div>

                {
                    search(myiIems).map(sItems => <SearchResult sItems={sItems} key={sItems.mission_name}></SearchResult>)
                }
            </div>
        </>
    );
};

export default Header;