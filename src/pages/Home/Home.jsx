import React from 'react';
import Banner from './Banner';
import Overview from './Overview';
import PackagesAndGuides from './PackagesAndGuides';
import StoriesSection from './StoriesSection';
import TravelQuizSection from '../TravelQuizSection/TravelQuizSection';
import WhyChooseUsSection from '../WhyChooseUsSection/WhyChooseUsSection';
import Footer from '../../components/Footer/Footer';


const Home = () => {
    return (
        <div>
        <Banner></Banner>
        <Overview></Overview>
        <PackagesAndGuides></PackagesAndGuides>
        <StoriesSection></StoriesSection>
        <TravelQuizSection></TravelQuizSection>
        <WhyChooseUsSection></WhyChooseUsSection> 
        <Footer></Footer>  
        </div>
    );
};

export default Home;