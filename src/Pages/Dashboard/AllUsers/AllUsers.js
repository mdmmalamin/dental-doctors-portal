import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const res = await fetch('https://doctors-portal-server-kappa-sooty.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });

    const handleMakeAdmin = id => {
        fetch(`https://doctors-portal-server-kappa-sooty.vercel.app/users/admin/${id}`,{
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                toast.success('Make admin successful');
                refetch();
            }
        })
    }



    const today = format(new Date(), "PP");
    return (
        <section className='bg-[#F1F5F9] px-14 h-screen'>
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
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr
                                key={user._id}
                                className="hover">
                                    <th>{idx+1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {
                                            user?.role !== 'admin' 
                                            && 
                                            <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-sm border-none btn-secondary text-white'>Make Admin</button>
                                        }
                                    </td>
                                    <td><button className='btn btn-sm border-none text-white bg-red-600'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default AllUsers;