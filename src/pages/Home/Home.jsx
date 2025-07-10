import React from 'react';
import Banner from './Banner';
import Overview from './Overview';
import PackagesAndGuides from './PackagesAndGuides';


const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <Overview></Overview>
        <PackagesAndGuides></PackagesAndGuides>   
        </div>
    );
};

export default Home;