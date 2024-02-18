import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imgHostKey = process.env.REACT_APP_imgbb_key;

    const navigate = useNavigate();

    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('https://doctors-portal-server-kappa-sooty.vercel.app/appointmentSpecialty')
            const data = await res.json();
            return data;
        }
    });

    const handleAddDoctor = data => {
        console.log(data);
        console.log(data.image);
        const img = data.image[0];
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            console.log(imgData);
            if(imgData.success){
                console.log(imgData.data.url);
                const doctor = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    img: imgData.data.url
                }
                
                // save doctor info to the database
                fetch('https://doctors-portal-server-kappa-sooty.vercel.app/doctors',{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    toast.success(`${data.name} is added successfully`);
                    navigate('/dashboard/managedoctors');
                })
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <section className='bg-[#F1F5F9] px-14 h-screen '>
            <h3 className="text-3xl font-bold pt-14 mb-6">Add a New Doctor</h3>

            <form onSubmit={handleSubmit(handleAddDoctor)}>

                {/* Name */}
                <div className="form-control w-full max-w-xs">
                    <label className="label p-1">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" 
                        {...register("name", {required: "Name is required!"})} 
                        className="input input-bordered w-full" />
                    {
                        errors.name 
                        && 
                        <p role="alert" className='text-red-600 text-sm'>
                            {errors.name?.message}
                        </p>
                    }
                </div>

                {/* Email */}
                <div className="form-control w-full max-w-xs">
                    <label className="label p-1">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" 
                        {...register("email", {required: "Email Address is required!"})} 
                        className="input input-bordered w-full" />
                    {
                        errors.email 
                        && 
                        <p role="alert" className='text-red-600'>
                            {errors.email?.message}
                        </p>
                    }
                </div>

                {/* Select */}
                <div className="form-control w-full max-w-xs">
                    <label className="label p-1">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select 
                    {...register("specialty", {required: "Specialty is required!"})}
                    className="select select-bordered w-full max-w-xs">
                        {/* <option disabled selected>Please Select a Specialty</option> */}
                        {
                            specialties.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }
                    </select>
                </div>

                {/* img */}
                <div className="form-control w-full max-w-xs">
                    <label className="label p-1">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file" 
                        {...register("image", {required: "Photo is required!"})} 
                        className="input input-bordered w-full" />
                    {
                        errors.img 
                        && 
                        <p role="alert" className='text-red-600 text-sm'>
                            {errors.img?.message}
                        </p>
                    }
                </div>

                <input className='btn btn-accent w-full max-w-xs' value="add doctor" type="submit" />
            </form>
        </section>
    );
};

export default AddDoctor;