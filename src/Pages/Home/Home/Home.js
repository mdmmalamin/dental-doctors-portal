import React from 'react';
import Banner from '../Banner/Banner';
import HomeAppointment from '../HomeAppointment/HomeAppointment';
// import InfoCards from '../InfoCards/InfoCards';
import Services from '../Services/Services';
import Treatment from '../Treatment/Treatment';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            {/* <InfoCards></InfoCards> */}
            <Services></Services>
            <Treatment></Treatment>
            <HomeAppointment></HomeAppointment>
        </div>
    );
};

export default Home;