import React from 'react';
import Header from '../Header/Header';
import Search from '../Search/Search';
import FetchItems from './FetchItems';

const Home = () => {
    return (
        <div>
            {/* <Header></Header> */}
            <Search></Search>
            <FetchItems></FetchItems>
        </div>
    );
};

export default Home;