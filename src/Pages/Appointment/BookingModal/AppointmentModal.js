import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import { signInWithPhoneNumber, RecaptchaVerifier, getAuth } from 'firebase/auth';

import app from '../../../firebase/firebase.config';
const auth = getAuth(app);

const AppointmentModal = ({ treatment, setTreatment, selectedDate, refetch, doctor, setDoctor }) => {
    // treatment is just another name of appointmentOption
    const { title, slots, price } = treatment; 
    // const { name, doctorFee } = doctor;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);
    const today = format(new Date(), "PPp");
    console.log(treatment);
    console.log(doctor);

    const { register, handleSubmit } = useForm();

    // SignIn with Phone Number Start
    const { recaptcha, signInPhone } = useContext(AuthContext);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [logger, setLogger] = useState(null);
    const [showOtp, setShowOtp] = useState(false);

    const sendOtp = async() => {
        try{
            let recaptchaVerifier = await new RecaptchaVerifier(auth, 'recaptchaId', {});
            let confirmation = await signInWithPhoneNumber(phone, recaptchaVerifier);
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

        // event.preventDefault();
        // const form = event.target;
        // const otp = form.otp.value;
        // const phone = form.phone.value;
        // console.log(otp);

        const patient_name = data.patient;
        const slot = data.slot;
        const email = data.email;
        const phone = data.phone;

        const booking = {
            bookingDate: today,
            appointmentDate: date,
            treatment: title,
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
                    <h3 className="text-lg font-bold mb-12">{title}</h3>
                    <form onSubmit={handleSubmit(handleBooking)} className='grid grid-cols-1 gap-3 md:gap-6'>
                        {/* Appointment Date  */}
                        <input 
                            type="text" 
                            placeholder="Date" 
                            readOnly
                            value={date} 
                            className="input input-bordered w-full" 
                            {...register("appointmentDate")} />
                        {/* Slot Select  */}
                        <select 
                            {...register("slot", { required: true })}>
                            {
                                slots.map((slot, idx) => <option
                                    key={idx}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>
                        {/* Doctors Select  */}
                        {/* <select 
                            {...register("doctors", { required: true })}>
                            {
                                name.map((singleName, idx) => <option
                                    key={idx}
                                    value={singleName}
                                >{singleName}</option>)
                            }
                        </select> */}
                        {/* Patient Name  */}
                        <input 
                            type="text" 
                            placeholder="Your Name" 
                            readOnly={user?.displayName} 
                            defaultValue={user?.displayName}
                            {...register("patient", {required: true, pattern: /^[a-zA-Z\- & .]+$/i})} />
                            {/* Email */}
                        <input 
                            type="email" 
                            placeholder="Email" 
                            readOnly={user?.email} 
                            defaultValue={user?.email}
                            {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
                        {/* Phone Number & OTP  */}
                                <>
                                    {/* <input 
                                        name='otp' 
                                        type="number" 
                                        value={otp} 
                                        onChange={e=> setOtp(e.target.value)} 
                                        placeholder="OTP" 
                                        className="input input-bordered w-full" /> */}
                                        <input 
                                        type="number" 
                                        placeholder="OTP" 
                                        {...register("otp", {required: true})} />
                                    <button className='btn' onClick={verifyOtp}>Confirm OTP</button>
                                </>

                                <>
                                    <input 
                                        type="tel" 
                                        placeholder="Phone Number" 
                                        {...register("phone", {required: true})} />
                                        {/* , pattern: /^(?:\+?88)?01[13-9]\d{8}$/i */}
                                    <button className='btn' onClick={sendOtp}>Send OTP</button>
                                </>
                                {/* <>
                                //     <input name='phone' type="Phone" value={phone} onChange={e => setPhone(phone)} placeholder="Phone Number" className="input input-bordered w-full" />
                                //     <button className='btn' onClick={sendOtp}>Send OTP</button>
                                </> */}

                        <div id='recaptchaId'></div>
                        <input type="submit" value="Submit" className='btn btn-accent w-full' />

                    </form>
                </div>
            </div>
        </>
    );
};

export default AppointmentModal;