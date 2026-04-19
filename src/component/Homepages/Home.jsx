import React from 'react';
import Banner from './Banner';
import OurMission from './OurMission';
import AboutDonation from './AboutDonation';
import TestimonialsSection from './TestimonialsSection';


const Home = () => {
    return (
        <div>
            <Banner />
            
            <OurMission/>
            <AboutDonation/>
            <TestimonialsSection/>
            
        </div>
    );
};

export default Home;