import React, { useEffect, useState } from 'react'
import { getStudentAssignmentsByClassroomIdService } from '../../service/AssignmentService';
import { NavLink, useParams } from 'react-router-dom';

export default function StudentAssignment() {

    const { id } = useParams();
 const [assignments, setAssignments] = useState([]);

  const getAssignments = async () => {
    const result = await getStudentAssignmentsByClassroomIdService(id);
    console.log("assignements: ", result.data);
    setAssignments(result.data);
  };


 useEffect(() => {
    
    getAssignments();
  }, []);

  return (
    <div>
      <div className="container mt-2">
        <h3>Assignments</h3>
        <div className="assignments-card-container mt-2">
          {assignments.map((assignment, index) => {
            return (
              <div className="container assignments-container">
                <div className="assign-col1">
                  <NavLink to={`/user/classroom/${id}/add-assignment/${assignment.assignmentId}`} className='nav-assignment' >
                      <h5>{index + 1}. {assignment.title}</h5>
                      <p>{assignment.description}</p>
                  </NavLink>

                </div>
                <div className="assign-col2">
                  <p>
                    <b>Due Date : {assignment.dueDate}</b>
                  </p>
                  <p>
                    <b>Marks : {assignment.maxMarks}</b>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
