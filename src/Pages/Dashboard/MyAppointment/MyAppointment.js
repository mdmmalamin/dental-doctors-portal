import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyAppointment = () => {
    const { user } = useContext(AuthContext);

    const url = `https://doctors-portal-server-kappa-sooty.vercel.app/bookings?email=${user?.email}`;

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async() => {
            const res = await fetch(url, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            console.log(data);
            return data;
        }
    })

    const today = format(new Date(), "PP");
    return (
        <div className='bg-[#F1F5F9] px-14 h-screen'>
            <div className='flex items-center justify-between pt-14 mb-6'>
                <h3 className="text-3xl">My Appointment</h3>
                <div className='border-2 border-accent rounded-md p-2'>{today}</div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Payment</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((booking, idx) => <tr
                                key={idx}
                                className="hover">
                                    <th>{idx+1}</th>
                                    <td>{booking.patient}</td>
                                    <td>{booking.treatment}</td>
                                    <td>{booking.appointmentDate}</td>
                                    <td>{booking.slot}</td>
                                    <td>
                                    {
                                        booking.price
                                        &&
                                        !booking.paid
                                        &&
                                        <Link to={`/dashboard/payment/${booking._id}`}><button className='btn btn-sm btn-secondary text-white'>Pay</button></Link>
                                    }
                                    {
                                        booking.price
                                        &&
                                        booking.paid
                                        &&
                                        <span className='text-secondary font-bold'>Paid</span>
                                    }
                                    </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointment;