// import React, { useEffect, useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'
// import { useAuth } from '../../../context/AuthContext'
// import { myCreatedClassroomService } from '../../../service/ClassroomService';

// export default function Sidebar() {

//   const {myClassroom,setMyClassroom, fetchSidebar,setFetchSidebar} = useAuth();

//   // const [createClassroom, setCreatedClassroom] = useState([]);

//   const myCreatedClassroom = async ()=>{

//       const result = await myCreatedClassroomService();
//       console.log("My Created classroom : ",result.data)

//       setMyClassroom(result.data);
     

//     }

//   useEffect(()=>{

//       myCreatedClassroom();

//   },[fetchSidebar])

//   return (
//     <div className='teacher-sidebar'>
      
//       <ul className='sidebar-ul'>
//           <li className='sidebar-li'>
//             <img className='sidebar-icons' src='/icons/dashboard.png'/> 
//             <NavLink to='/teacher/dashboard'>Dashboard</NavLink> 
//           </li>

//           <hr />

//           <li className='sidebar-li'>
//             <img className='sidebar-icons' src='/icons/add.png'/> 
//             <NavLink to='/teacher/create-classroom'>Create Classroom</NavLink>
//           </li>

//           <hr />

//           {/* {JSON.stringify(myClassroom)} */}

//           <div className="accordion" id="accordionExample">
//             <div className="accordion-item">
//                <h2 className="accordion-header">
//                 <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//                    <div className='my-classroom'>
//                         <img src="/icons/classroom.png" alt="Classroom Icon" width="50px" /> 
//                         <p>My Classroom</p>
//                    </div>
                   
//                 </button>
//               </h2>

//               <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
//                 <div className="accordion-body">

//                   <ul className='class-list-ul'>

//                         {myClassroom.map((classroom)=>{

//                           return <li className='class-list' key={classroom.classRoomId}>

//                                     <img src="/icons/class.png" alt="Classroom" width="30px"/>
//                                    <NavLink to={`/teacher/classroom/${classroom.classRoomId}`} >{classroom.classRoomCode} - {classroom.title} </NavLink>   
                                      
//                                 </li>

//                         })}

//                   </ul>    
                    
//                 </div>
//               </div>

//             </div>
//           </div>
         
//         </ul>

//     </div>
//   )
// }

import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { myCreatedClassroomService } from '../../../service/ClassroomService';
import './TeacherSidebar.css'; // ← link to your new CSS

export default function Sidebar() {
  const { myClassroom, setMyClassroom, fetchSidebar } = useAuth();

  const myCreatedClassroom = async () => {
    const result = await myCreatedClassroomService();
    setMyClassroom(result.data);
  };

  useEffect(() => {
    myCreatedClassroom();
  }, [fetchSidebar]);

  return (
    <div className="teacher-sidebar">
      <ul className="sidebar-ul">
        <li className="sidebar-li">
          <NavLink to="/teacher/dashboard" className="sidebar-link">
            <img className="sidebar-icon" src="/icons/dashboard.png" alt="Dashboard" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li className="sidebar-li">
          <NavLink to="/teacher/create-classroom" className="sidebar-link">
            <img className="sidebar-icon" src="/icons/add.png" alt="Create" />
            <span>Create Classroom</span>
          </NavLink>
        </li>

        {/* Accordion Section */}
        <li className="sidebar-li mt-3">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item border-0">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed bg-light"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <img src="/icons/classroom.png" alt="Classroom Icon" width="30px" className="me-2" />
                  <span>My Classrooms</span>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0">
                  <ul className="class-list-ul ps-3">
                    {myClassroom.map((classroom) => (
                      <li className="class-list" key={classroom.classRoomId}>
                        <NavLink
                          to={`/teacher/classroom/${classroom.classRoomId}`}
                          className="sidebar-link small"
                        >
                          <img src="/icons/class.png" width="20px" className="me-2" />
                          {classroom.classRoomCode} - {classroom.title}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
