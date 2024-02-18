import React from 'react';

const AppointmentOptions = ({ appointmentOption, setTreatment }) => {
    const { name,price, slots } = appointmentOption;
    return (
        <div className="card shadow-lg">
            <div className="card-body text-center">
                <h2 className="card-title text-secondary mx-auto">{name}</h2>
                <p className='text-sm'>
                    { slots.length > 0 ? slots[0] : 'Try Another Day'}
                </p>
                <p className='text-xs'>
                    { slots.length } {slots.length > 1 ? 'spaces' : 'space'} available
                </p>
                <p className='text-xs font-bold'>Price: ${price}</p>
                <div className="card-actions justify-center">
                    <label 
                        disabled={slots.length === 0}
                        onClick={ () => setTreatment(appointmentOption)} 
                        htmlFor="booking-modal" 
                        className="btn border-none text-white bg-gradient-to-r from-primary to-secondary"
                    >Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOptions;