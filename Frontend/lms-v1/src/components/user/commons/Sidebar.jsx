import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getJoinedClassroomService } from '../../../service/StudentService';

export default function Sidebar() {


  const [joinedClassroom,setJoinedClassroom] = useState([]);


  useEffect(()=>{

    const getJoinedClassroom = async ()=>{

        const result = await getJoinedClassroomService();

        setJoinedClassroom(result.data);

    }

    getJoinedClassroom();

  },[]);

  return (
    <div className='user-sidebar'>
        <ul className='sidebar-ul'>
          
          <li className='sidebar-li'>
            <img className='sidebar-icons' src='/icons/dashboard.png'/> 
            <NavLink to='/user/dashboard'>Dashboard</NavLink>
          </li>

          <hr />

          <li className='sidebar-li'>
            <img className='sidebar-icons' src='/icons/add.png'/>  
            <NavLink to='/user/join-classroom'>Join Classroom</NavLink>
          </li>

          <hr />

          <div className="accordion" id="accordionExample">

            <div className="accordion-item">
               <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                   <div className='my-classroom'>
                        <img src="/icons/classroom.png" alt="Classroom Icon" width="50px" /> 
                        <p>My Classroom</p>
                   </div>
                   
                  </button>
                </h2>

                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">

                  <div className="accordion-body">
                    <ul className='class-list-ul'>
                      {
                        joinedClassroom.map((classroom)=>{

                          
                          return <li className='class-list' key={classroom.classroomId}>
                          
                                      <img src="/icons/class.png" alt="Classroom" width="30px"/>
                                      <NavLink to={`/user/classroom/${classroom.classroomId}`} >{classroom.classroomCode} - {classroom.title} </NavLink>   
                                      
                                  </li>

                        })
                      }
                    </ul>
                  </div>

                </div>

              </div>
          </div>
         
        </ul>
    </div>
  )
}
