import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit } = useForm();

    const handleLogin = data => {
        console.log(data);
    }

    return (
        <section className='h-[80vh] md:w-1/2 mx-auto flex justify-center items-center'>
            <div className='shadow-md rounded-xl p-7 w-96'>
                <h2 className='text-xl text-center mb-8'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    
                    <div className="form-control w-full max-w-xs">
                        <label className="label p-1">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email")} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-full max-w-xs my-2.5">
                        <label className="label p-1">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password")} className="input input-bordered w-full" />
                        <label className="label p-1">
                            <span className="text-xs">Forgot Password?</span>
                        </label>
                    </div>
                    <input className='btn btn-accent w-full' value="LOGIN" type="submit" />
                </form>
                <p className='text-xs mt-2.5 text-center'>New to Doctors Portal? <Link to='/' className='text-secondary'>Create new account</Link></p>
                <div className="divider mt-4 mb-6">OR</div>
                <button className='btn bg-white text-black w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </section>
    );
};

export default Login;