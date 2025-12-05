import React from 'react';
import useAuth from '../../hooks/authentication/useAuth';
import { Navigate, useLocation } from 'react-router';

const UserPrivetRoutes = ({children}) => {
    const {isLoading,user} = useAuth();
    const location = useLocation();
    if(isLoading){
        return <p>Loading...</p>
    }
    if(!user){
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }
    
    return children;
};

export default UserPrivetRoutes;