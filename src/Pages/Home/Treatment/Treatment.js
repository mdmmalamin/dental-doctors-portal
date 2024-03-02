import React from 'react';
import treatment from '../../../assets/images/treatment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import { Link } from 'react-router-dom';

const Treatment = () => {
    return (
        <section>
            <div className="hero mt-10 lg:mt-40">
                <div className="hero-content flex-col lg:flex-row gap-10 lg:gap-24">
                    <img src={treatment} className="md:w-1/2 rounded-lg shadow-lg lg:h-[576px]" alt='Treatment' />
                    <div className='lg:w-[500px]'>
                        <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                        <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                        <Link to="/appointment"><PrimaryButton>GET STARTED</PrimaryButton></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Treatment;