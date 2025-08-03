import React from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {

  const {logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout();
    sessionStorage.removeItem('token');
    console.log("Logging out");
    navigate('/');
  }

  return (
    <div className='user-header'>
        <div className='logo'>
          <img src="/edu-logo.png" alt="Logo" height="60" className="logo-img"/>
         <h4 className="ms-3 mb-0">ClassNest</h4>
        </div>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
    </div>
  )
}
