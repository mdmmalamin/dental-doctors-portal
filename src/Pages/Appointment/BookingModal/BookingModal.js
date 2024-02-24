import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    // treatment is just another name of appointmentOption
    const { name, slots, price } = treatment; 
    // console.log(treatment);
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);
    // console.log(user);
    const today =format(new Date(), "PP");

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const patient_name = form.name.value;
        const slot = form.slot.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            bookingDate: today,
            appointmentDate: date,
            treatment: name,
            patient: patient_name,
            slot,
            email,
            phone,
            price
        }
        // TODO: send data to the server
        // and once data is saved then close the modal display success toast
        console.log(booking);

        fetch('https://doctors-portal-server-kappa-sooty.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.acknowledged){
                setTreatment(null);
                toast.success('Booking confirmed');
                refetch();
            }
            else{
                toast.error(data.message)
            }
        })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold mb-12">{name}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 md:gap-6'>
                        <input type="text" disabled value={date} className="input input-bordered w-full" />
                        <select name="slot" className="select select-bordered w-full">
                            {
                                slots.map((slot, idx) => <option
                                    key={idx}
                                    value={slot}
                                >{slot}</option>)
                            }
                        </select>
                        <input name='name' type="text" readOnly={user?.displayName} defaultValue={user?.displayName} placeholder="Your Name" className="input input-bordered w-full" />
                        <input name='email' type="email" readOnly={user?.email} defaultValue={user?.email} placeholder="Email Address" className="input input-bordered w-full" />
                        <input name='phone' type="Phone" readOnly={user?.phoneNumber} defaultValue={user?.phoneNumber} placeholder="Phone Number" className="input input-bordered w-full" />
                        <input type="submit" value="Submit" className='btn btn-accent w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;