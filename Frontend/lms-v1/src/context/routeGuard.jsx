import React from 'react'
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export default function RouteGuard({allowedRoles,children}) {
  
    const {isAuthenticated,userRole} = useAuth();

    if (!isAuthenticated || !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
      }

    

    return children;

}
