import React from 'react';
import appointment from '../../../assets/images/appointment.png';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

const Contact = () => {
    return (
        <section className='mt-32' style={{background: `url(${appointment})`}}>
            <div className='text-center pt-16 mb-10'>
                <h4 className="text-lg text-secondary font-bold">Contact Us</h4>
                <h1 className="text-4xl text-white">Stay connected with us</h1>
            </div>
            <div className='text-center pb-16'>
                <input type="email" placeholder="Email Address" className="input input-bordered w-full max-w-xs md:max-w-md" />
                <br />
                <input type="text" placeholder="Subject" className="input input-bordered w-full max-w-xs md:max-w-md my-5" />
                <br />
                <textarea className="textarea textarea-bordered w-full max-w-xs md:max-w-md h-32 mb-9" placeholder="Your message"></textarea>
                <br />
                <PrimaryButton>Submit</PrimaryButton>
            </div>
        </section>
    );
};

export default Contact;