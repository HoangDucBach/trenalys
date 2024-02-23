// RequireLoginComponent.js
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const RequireLoginComponent = ({children}) => {
    const isLogged = useSelector(state => state.status.isLogged);
    if (!isLogged) {
        window.location.href = '/login';
        return null;
    }

    return <>{children}</>;
};
const RequireDashboardComponent = ({children}) => {
    const isLogged = useSelector(state => state.status.isLogged);
    const navigate = useNavigate();

    if (!isLogged) {
        window.location.href = '/dashboard';
        return null;
    }

    return <>{children}</>;
};
export default RequireLoginComponent;
