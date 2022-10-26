import React from 'react';
import Header from '../Header/Header';
import FetchItems from './FetchItems';

const Home = () => {
    return (
        <div>
            <h2>Header</h2>
            <Header></Header>
            <h2>Fetched Items</h2>
            <FetchItems></FetchItems>
        </div>
    );
};

export default Home;