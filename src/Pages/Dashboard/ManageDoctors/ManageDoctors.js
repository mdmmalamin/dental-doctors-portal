import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../components/PrimaryButton/Loading/Loading';

const ManageDoctors = () => {
    const { data: doctors, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: async() => {
            try{
                const res = await fetch('http://localhost:5000/doctors',
                {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            }
            catch(err){
                console.error(err);
            }
        }
    });

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <section className='bg-[#F1F5F9] px-14 h-screen'>
                <h3 className="text-3xl pt-14 mb-6">Manage Doctors: {doctors?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>AVATAR</th>
                        <th>NAME</th>
                        <th>SPECIALTY</th>
                        <th>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, idx) => <tr
                                key={doctor?._id}
                                className="hover">
                                    <th>{idx+1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-24 rounded-full">
                                                <img src={doctor?.img} alt={doctor?.name} />
                                            </div>
                                        </div>
                                    </th>
                                    <td>{doctor?.name}</td>
                                    <td>{doctor?.specialty}</td>
                                    <td><button className='btn btn-sm border-none text-white bg-red-600'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageDoctors;