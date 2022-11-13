import React from 'react';
import doctor_small from '../../../assets/images/doctor-small.png';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const HomeAppointment = () => {
    return (
        <section className='mt-32' style={{background: `url(${appointment})`}}>
            <div className="hero mt-10 lg:mt-52 px-0 lg:px-32">
                <div className="hero-content flex-col lg:flex-row gap-6 pb-0">
                    <img src={doctor_small} className="-mt-24 md:w-1/2 hidden md:block" alt='doctor' />
                    <div className='py-16'>
                        <h4 className="text-lg text-secondary font-bold">Appointment</h4>
                        <h1 className="text-4xl text-white">Make an appointment Today</h1>
                        <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <PrimaryButton>APPOINTMENT</PrimaryButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeAppointment;