import React, { useState } from 'react';
import chair from '../../../assets/images/chair.png';
import bg from '../../../assets/images/bg.png';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';

const AppointmentBanner = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());


    return (
        <header className='bg-contain bg-no-repeat my-10 lg:py-48' style={{backgroundImage: `url(${bg})`}}>
                        <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse justify-around gap-6">
                    <img src={chair} className="rounded-lg lg:w-1/2 shadow-2xl" alt="dentist chair" />
                    <div>
                        <DayPicker 
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}

                        />
                        <p>You have selected date: {format(selectedDate, 'PP')}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppointmentBanner;