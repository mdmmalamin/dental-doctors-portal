import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import { RecaptchaVerifier, getAuth } from 'firebase/auth';

import app from '../../../firebase/firebase.config';
const auth = getAuth(app);

const AppointmentModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    // treatment is just another name of appointmentOption
    const { name, slots, price } = treatment; 
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);
    const today = format(new Date(), "PP");
    // console.log(treatment);

    const { register, handleSubmit } = useForm();

    // SignIn with Phone Number Start
    const { recaptcha, signInPhone } = useContext(AuthContext);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [logger, setLogger] = useState(null);
    const [showOtp, setShowOtp] = useState(false);

    const sendOtp = async() => {
        try{
            let recaptchaVerifier = await new RecaptchaVerifier(auth, 'recaptchaId', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // onSignInSubmit();
                }
            });
            let confirmation = await signInPhone(phone, recaptchaVerifier);
            console.log(confirmation);
            setLogger(confirmation);
            setShowOtp(true);
        }catch(err){
            console.log(err)
        }
    }

    const verifyOtp = async() => {
        await logger.confirm(otp);
    }
    // SignIn with Phone Number End

    const handleBooking = data => {
        console.log('handleSignUp:', data);

        const patient_name = data.patient;
        const slot = data.slot;
        const email = data.email;
        const phone = data.phone;

        const booking = {
            bookingDate: today,
            appointmentDate: date,
            treatment: name,
            patient: patient_name,
            slot,
            email,
            phone,
            servicePrice: price,
        }
        // TODO: send data to the server
        // and once data is saved then close the modal display success toast
        console.log(booking);

        // fetch('https://doctors-portal-server-kappa-sooty.vercel.app/bookings', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(booking)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data);
        //     if(data.acknowledged){
        //         setTreatment(null);
        //         toast.success('Booking confirmed');
        //         refetch();
        //     }
        //     else{
        //         toast.error(data.message)
        //     }
        // })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-12">{name}</h3>
                    <form onSubmit={handleSubmit(handleBooking)} className='grid grid-cols-1 gap-3 md:gap-6'>
                        <input 
                            type="text" 
                            placeholder="Date" 
                            readOnly
                            value={date} 
                            className="input input-bordered w-full" 
                            {...register("appointmentDate")} />
                        <select 
                            {...register("slot", { required: true })}>
                            {
                                slots.map((slot, idx) => <option
                                    key={idx}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            readOnly={user?.displayName} 
                            defaultValue={user?.displayName}
                            {...register("patient", {required: true, pattern: /^[a-zA-Z\- & .]+$/i})} />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            readOnly={user?.email} 
                            defaultValue={user?.email}
                            {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
                        {
                            showOtp?
                                // Phone Login Start 
                                <>
                                    <input 
                                        name='otp' 
                                        type="number" 
                                        value={otp} 
                                        onChange={e=> setOtp(e.target.value)} 
                                        placeholder="OTP" 
                                        className="input input-bordered w-full" />
                                    <button className='btn' onClick={verifyOtp}>Confirm OTP</button>
                                </>
                            : 
                                <>
                                    <input 
                                        type="tel" 
                                        placeholder="Phone Number" 
                                        {...register("phone", {required: true, pattern: /^(?:\+?88)?01[13-9]\d{8}$/i})} />
                                    <button className='btn' onClick={sendOtp}>Send OTP</button>
                                </>
                        }

                        <div id='recaptchaId' className='hidden'></div>
                        <input type="submit" value="Submit" className='btn btn-accent w-full' />

                    </form>
                </div>
            </div>
        </>
    );
};

export default AppointmentModal;