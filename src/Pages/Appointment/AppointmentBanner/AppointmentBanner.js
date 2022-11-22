import React from 'react';
import chair from '../../../assets/images/chair.png';
import bg from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {


    return (
        <header className='bg-contain bg-no-repeat my-10 lg:py-48' style={{backgroundImage: `url(${bg})`}}>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse justify-around gap-6">
                    <img src={chair} className="rounded-lg lg:w-1/2 shadow-lg" alt="dentist chair" />
                    <div className='shadow-lg rounded-xl bg-white'>
                        <DayPicker 
                            // disabled={new Date()}
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;