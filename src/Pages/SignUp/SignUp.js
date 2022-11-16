import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const { register, formState: {errors}, handleSubmit } = useForm();

    const handleSignUp = data => {
        console.log(data);
    }
    return (
        <section className='h-[80vh] md:w-1/2 mx-auto flex justify-center items-center'>
            <div className='shadow-md rounded-xl p-7 w-96'>
                <h2 className='text-xl text-center mb-8'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>

                    {/* Name */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label p-1">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" 
                            {...register("name", {required: "Name is required!"})} 
                            className="input input-bordered w-full" />
                        {errors.name && <p role="alert" className='text-red-600 text-sm'>{errors.name?.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label p-1">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" 
                            {...register("email", {required: "Email Address is required!"})} 
                            className="input input-bordered w-full" />
                        {errors.email && <p role="alert" className='text-red-600 text-sm'>{errors.email?.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-control w-full max-w-xs mt-2.5 mb-5">
                        <label className="label p-1">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" 
                            {...register("password", {
                                required: "Password is required!", 
                                minLength: { value: 8, message: "Password must be 8 characters or longer!" }, 
                                maxLength: { value: 17, message: "Password maximum 12 characters!" },
                                pattern: {value: /(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}/, message: "Password must be strong!"}
                            })} 
                            className="input input-bordered w-full" />
                        {errors.password && <p role="alert" className='text-red-600 text-sm'>{errors.password?.message}</p>}
                    </div>

                    <input className='btn btn-accent w-full' value="SIGN UP" type="submit" />
                </form>
                <p className='text-xs mt-2.5 text-center'>Already have an account? <Link to='/login' className='text-secondary'>Login now</Link></p>
                <div className="divider mt-4 mb-6">OR</div>
                <button className='btn bg-white text-black w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </section>
    );
};

export default SignUp;