// import React from 'react'
// import { NavLink } from 'react-router-dom'

// export default function Sidebar() {
//   return (
//     <div className='admin-sidebar'>
      
//       <ul className='sidebar-ul'>
//           <li className='sidebar-li'>

//               <img className='sidebar-icons' src='/icons/dashboard.png'/> 
//               <NavLink to='/admin/dashboard' >Dashboard</NavLink>

//           </li>

//           <hr />

//           <li className='sidebar-li'>

//               <img className='sidebar-icons' src='/icons/add.png'/>  
//               <NavLink to='/admin/add-teacher' >Add Teacher</NavLink>
//           </li> 

//           <hr />

//           <li className='sidebar-li'>
//              <img className='sidebar-icons' src='/icons/eye.png'/>
//             <NavLink to='/admin/view-teacher' >View Teacher</NavLink>  
//           </li> 
//       </ul>

//     </div>
//   )
// }
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; 


export default function Sidebar() {
  return (
    <div className='admin-sidebar'>
      <ul className='sidebar-ul'>
        <li className='sidebar-li'>
          <NavLink to='/admin/dashboard' className='sidebar-link'>
            <img className='sidebar-icon' src='/icons/dashboard.png' alt='Dashboard' />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className='sidebar-li'>
          <NavLink to='/admin/add-teacher' className='sidebar-link'>
            <img className='sidebar-icon' src='/icons/add.png' alt='Add Teacher' />
            <span>Add Teacher</span>
          </NavLink>
        </li>

        <li className='sidebar-li'>
          <NavLink to='/admin/view-teacher' className='sidebar-link'>
            <img className='sidebar-icon' src='/icons/eye.png' alt='View Teacher' />
            <span>View Teacher</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

