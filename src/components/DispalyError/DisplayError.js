import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const DisplayError = () => {
    const { logOut } = useContext(AuthContext);
    const error = useRouteError();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
        .then( () => {
            navigate('/login');
        })
        .catch(err => console.error(err))
    }
    return (
        <div>
            <p className='text-red-600'>Something went wrong!</p>
            <p className='text-red-600'>{error.statusText || error.message}</p>
            <p className='text-3xl'>Please <button className='btn' onClick={handleLogOut}>Sign Out</button></p>
        </div>
    );
};

export default DisplayError;