import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {

    const myiIems = useSelector((state) => state.allItems.items);

    console.log('myItems', myiIems);

    const [profileData, setprofileData] = useState([
        {
            name: "Brian Kernighan",
            email: "brian@test.com",
            password: "password1",
            skills: ["AWK", "AMPL", "Unix"]
        },
        {
            name: "Max Kanat-Alexander",
            email: "max@test.com",
            password: "password1",
            skills: ["Java", "Perl", "Apache", "Python"]
        },
        {
            name: "Spruce Emmanuel",
            email: "new@test.com",
            password: "password1",
            skills: ["JavaScript", "Perl", "Apache", "Node.js"]
        }
    ]);

    console.log('profileData', profileData);

    const [q, setQ] = useState("");
    const [searchTerm] = useState(["mission_name"]);

    function search(items) {
        return items.filter((item) => {
            return searchTerm.some((newItem) => {
                return (
                    item[newItem]
                        ?.toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });
    }


    return (
        <>
            <div>
                <h2>Search and Select Filtering...</h2>
                <input
                    type="text"
                    placeholder="search..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />

                {search(myiIems).map((val, key) => {
                    return (
                        <div className="box" key={key}>
                            <p>{val.mission_name}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Header;