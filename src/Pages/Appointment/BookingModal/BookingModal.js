import { format } from 'date-fns';
import React from 'react';

const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
    // treatment is just another name of appointmentOption
    const { name, slots } = treatment; 
    // console.log(treatment);
    const date = format(selectedDate, 'PP');

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const patient_name = form.name.value;
        const slot = form.slot.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            bookingDate: '',
            appointmentDate: date,
            treatment: name,
            patient: patient_name,
            slot,
            email,
            phone
        }
        // TODO: send data to the server
        // and once data is saved then close the modal display success toast
        console.log(booking);
        setTreatment(null);
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
                        <input name='name' type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        <input name='email' type="email" placeholder="Email Address" className="input input-bordered w-full" />
                        <input name='phone' type="Phone" placeholder="Phone Number" className="input input-bordered w-full" />
                        <input type="submit" value="Submit" className='btn btn-accent w-full' />
                    </form>
                </div>
            </div>
        </>
    );
};

export default BookingModal;