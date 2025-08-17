import React from 'react';
import Banner from './Banner';
import Overview from './Overview';
import PackagesAndGuides from './PackagesAndGuides';
import StoriesSection from './StoriesSection';
import TravelQuizSection from '../TravelQuizSection/TravelQuizSection';
import WhyChooseUsSection from '../WhyChooseUsSection/WhyChooseUsSection';
import UpcomingEvents from './UpcomingEvents';
import PhotoHighlights from './PhotoHighlights';




const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <Overview></Overview>
        <PackagesAndGuides></PackagesAndGuides>
        <PhotoHighlights></PhotoHighlights>
        <UpcomingEvents></UpcomingEvents>
        <StoriesSection></StoriesSection>
        <TravelQuizSection></TravelQuizSection>
        <WhyChooseUsSection></WhyChooseUsSection>   
        </div>
    );
};

export default Home;