import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [ isAdmin, isAdminLoading ] = useAdmin(user?.email);
    const location = useLocation();

    if(loading || isAdminLoading){
        return <Loading></Loading>;
    }

    if(user && isAdmin){
        return children;
    }

    return (
        <Navigate to='/login' state={{form: location}} replace>
            
        </Navigate>
    );
};

export default AdminRoute;