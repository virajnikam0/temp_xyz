// import React from 'react'

// export default function Header() {
//   return (
//     <div className='landing-header'>
        
//         <img src="logo.jpg" alt="LOGO" height="98px"/>

//     </div>
//   )
// }

import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

export default function Header() {
  return (
    <div className='landing-header d-flex align-items-center px-4'>
      <Link to="/" className="text-decoration-none d-flex align-items-center">
        <img src="/edu-logo.png" alt="Logo" height="60" className="logo-img" />
        <h4 className="ms-3 mb-0">ClassNest</h4>
      </Link>
    </div>
  );
}
