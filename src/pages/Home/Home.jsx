import React from 'react';
import Banner from './Banner';
import Overview from './Overview';
import PackagesAndGuides from './PackagesAndGuides';
import StoriesSection from './StoriesSection';


const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <Overview></Overview>
        <PackagesAndGuides></PackagesAndGuides>
        <StoriesSection></StoriesSection>   
        </div>
    );
};

export default Home;