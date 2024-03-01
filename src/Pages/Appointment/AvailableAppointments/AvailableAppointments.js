import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Loading from '../../../components/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';
import AppointmentModal from '../BookingModal/AppointmentModal';

const AvailableAppointments = ({ selectedDate }) => {
    // const [ appointmentOptions, setAppointmentOptions ] = useState([]);
    const [ treatment, setTreatment] = useState(null);

    // const {data:appointmentOptions = [] } = useQuery({
    //     queryKey: ['appointmentOptions'],
    //     queryFn: () => fetch('https://doctors-portal-server-kappa-sooty.vercel.app/appointmentOptions')
    //         .then(res => res.json())
    // });

    const date = format(selectedDate, 'PP');
    const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
        queryKey: ['appointmentOptions', date],
        queryFn: async() => {
            const res = await fetch(`https://doctors-portal-server-kappa-sooty.vercel.app/v2/appointmentOptions?date=${date}`);
            const data = res.json();
            return data;
        }
    });

    if(isLoading){
        return <Loading></Loading>
    }

    // useEffect( () => {
    //     // fetch('appointmentOptions.json')
    //     fetch('https://doctors-portal-server-kappa-sooty.vercel.app/appointmentOptions')
    //     .then(res => res.json())
    //     .then(data => setAppointmentOptions(data))
    //     // .then(data => console.log(data))
    // }, []);
    return (
        <section>
            <p className='text-center font-bold text-secondary'>Available Appointment on {format(selectedDate, 'PP')}</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 mx-10 my-24'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {   treatment &&
                // <BookingModal
                //     selectedDate={selectedDate}
                //     treatment={treatment}
                //     setTreatment={setTreatment}
                //     refetch={refetch}
                // ></BookingModal>
                <AppointmentModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                />
            }
        </section>
    );
};

export default AvailableAppointments;