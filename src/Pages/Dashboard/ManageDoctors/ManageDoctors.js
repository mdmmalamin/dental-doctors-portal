import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Loading from '../../../components/Loading/Loading';
import ConfirmationModal from '../../../components/Modal/ConfirmationModal';

const ManageDoctors = () => {
    const [ deletingDoctor, setDeletingDoctor ] = useState(null);

    const closeModal = () => {
        setDeletingDoctor(null);
    }

    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async() => {
            try{
                const res = await fetch('https://doctors-portal-server-kappa-sooty.vercel.app/doctors',
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

    const handleDeleteDoctor = doctor => {
        console.log(doctor);
        fetch(`https://doctors-portal-server-kappa-sooty.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                toast.success(`Dr. ${doctor.name} deleted successfully.`)
            }
            
        })
    }

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
                                    <td>
                                        <label 
                                        onClick={() => setDeletingDoctor(doctor)}
                                        htmlFor="confirmation-modal" 
                                        className="btn btn-sm border-none text-white bg-red-600">Delete</label>
                                    </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor
                &&
                <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${deletingDoctor.name}. It can't be undone.`}
                    modalData={deletingDoctor}
                    successAction={handleDeleteDoctor}
                    successActionName='Delete'
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </section>
    );
};

export default ManageDoctors;