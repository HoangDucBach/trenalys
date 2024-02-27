import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const RequireAuth = ({children}) => {
    const isLogged = useSelector(state => state.status.isLogged);
    if (!isLogged) {
        // window.location.href = '/login';
        return(
            <Navigate to={'/login'}/>
        ) ;
    }

    return <>{children}</>;
};
const RequireDashboardComponent = ({children}) => {
    const isLogged = useSelector(state => state.status.isLogged);
    const navigate = useNavigate();

    if (!isLogged) {
        // window.location.href = '/dashboard';
        return (
            <Navigate to={'/dashboard'}/>
        );
    }

    return <>{children}</>;
};
export default RequireAuth;
