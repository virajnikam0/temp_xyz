import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getAssignmentsByClassroomIdService } from '../../service/AssignmentService';
// import { getClassroomDetailsByClassroomIdService } from '../../service/ClassroomService';


export default function Assignments() {

  const {id} = useParams();

  const [assignments, setAssignments] = useState([]);




  useEffect(()=>{

      const getAssignmentsByClassRoomId = async ()=>{

      
      const result = await getAssignmentsByClassroomIdService(id);

      setAssignments(result);
  }

    getAssignmentsByClassRoomId();

  },[id]);



  return (
    <div>
        <h3>Assignments</h3>
      <div className='assignments-card-container'>
        {
            assignments.map( (assignment, index) => {

              // return <p key={index}>{assignment.assignmentId} - {assignment.title}</p>

              return(
                        <div className='container assignments-container'>
                            <div className='assign-col1'>
                                  <NavLink className="nav-assignment" to={`/teacher/classroom/${id}/view-assignment/${assignment.assignmentId}`}>
                                  
                                    <h5>{index+1}. {assignment.title}</h5>
                                  </NavLink>
                             
                                    <p>{assignment.description}</p>  
                            
                            </div>

                            <div className='assign-col2'>
                                <p><b>Due date : {assignment.dueDate}</b></p>
                                <p><b>Marks : {assignment.maxMarks}</b></p>
                            </div>

                        </div>

              );

            })

        }
        </div>
    </div>
  )
}
