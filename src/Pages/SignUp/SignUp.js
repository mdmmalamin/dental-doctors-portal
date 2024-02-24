import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const { register, formState: {errors}, handleSubmit } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [ signUpError, setSignUpError ] = useState('');
    const [ createdUserEmail, setCreatedUserEmail ] = useState('');
    const [ token ] = useToken(createdUserEmail);
    const navigate = useNavigate();

    if(token){
        navigate('/appointment');
    }

    const handleSignUp = data => {
        console.log('handleSignUp:', data);
        setSignUpError('');
        createUser(data.email, data.password) // To AuthProvider
        .then(result => {
            const user = result.user;
            console.log('user:',user);

            toast.success('User Create Successfully');

            const userInfo = {
                displayName: data.name
            }
            updateUser(userInfo)
            .then( () => {
                saveUser(data.name, data.email);
            })
            .catch(err => console.error(err))
        })
        .catch(err => {
            console.error(err);
            setSignUpError('This email already in use');
        })
    }

    const saveUser = (name, email, tel) => {
        const user = {name, email, tel};
        fetch('https://doctors-portal-server-kappa-sooty.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            setCreatedUserEmail(email);
        })
    }



    return (
        <section className='h-[80vh] md:w-1/2 mx-auto flex justify-center items-center'>
            <div className='shadow-md rounded-xl p-7 w-96'>
                <h2 className='text-xl text-center mb-8'>Sign Up</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>

                    {/* Name */}
                    <div className="form-control w-full max-w-xs my-2">
                        <label className="label p-1">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" 
                            placeholder="Full Name"
                            {...register("name", {
                                required: "Name is required!",
                                pattern: { value: /([a-zA-Z])\.?-?\D/, message: "Name not validate"},
                        })} 
                            className="input input-bordered w-full" />
                        {errors.name && <p role="alert" className='text-red-600 text-sm mx-2 my-1'>{errors.name?.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="form-control w-full max-w-xs my-1">
                        <label className="label p-1">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" 
                            placeholder="Email"
                            {...register("email", {required: "Email Address is required!"})} 
                            className="input input-bordered w-full" />
                        {errors.email && <p role="alert" className='text-red-600 text-sm mx-2 my-1'>{errors.email?.message}</p>}
                    </div>

                    {/* Phone Number */}
                    <div className="form-control w-full max-w-xs my-1">
                        <label className="label p-1">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input type="tel" 
                            placeholder="Phone Number" 
                            {...register("tel", {
                                required: "Phone Number is required!", 
                                minLength: { value: 11, message: "Phone Number must be required!" }, 
                                maxLength: { value: 11, message: "Phone Number must be required!" },
                            })} 
                            className="input input-bordered w-full" />
                        {errors.tel && <p role="alert" className='text-red-600 text-sm mx-2 my-1'>{errors.tel?.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="form-control w-full max-w-xs my-1">
                        <label className="label p-1">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" 
                            placeholder="Password"
                            {...register("password", {
                                required: "Password is required!", 
                                minLength: { value: 8, message: "Password must be 8 characters or longer!" }, 
                                maxLength: { value: 20, message: "Password maximum 20 characters!" },
                                pattern: { value: /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8}/, message: "Password must be used at least a Capital letter & Number!"}
                                // pattern: {value: /(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}/, message: "Password must be strong!"}
                            })} 
                            className="input input-bordered w-full" />
                        {errors.password && <p role="alert" className='text-red-600 text-sm mx-2 my-1'>{errors.password?.message}</p>}
                    </div>

                    <input className='btn btn-accent w-full my-5' value="SIGN UP" type="submit" />
                    { signUpError && <p className='text-red-600 text-center'>{signUpError}</p>}
                </form>
                <p className='text-xs mt-2.5 text-center'>Already have an account? <Link to='/login' className='text-secondary'>Login now</Link></p>
                <div className="divider mt-4 mb-6">OR</div>
                <button className='btn bg-white text-black w-full'>CONTINUE WITH GOOGLE</button>
            </div>
        </section>
    );
};

export default SignUp;