import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
    const booking = useLoaderData();
    const navigation = useNavigation();

    const  { treatment, price, appointmentDate, slot } = booking;
    if(navigation.state === 'loading'){
        return <Loading></Loading>
    }
    return (
        <section className='bg-[#F1F5F9] px-14 h-screen'>
            <h3 className="text-3xl pt-12">Payment for {treatment}</h3>
            <p className="text-xl my-6">Please Pay <strong>${price}</strong> for your appointment on {appointmentDate}, {slot}.</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm 
                        booking={booking}
                    />
                </Elements>
            </div>
        </section>
    );
};

export default Payment;