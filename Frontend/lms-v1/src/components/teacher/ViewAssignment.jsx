import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAssignmentDetailsByAssignmentIdService } from '../../service/AssignmentService';

export default function ViewAssignment() {

  const {assignmentid} = useParams();

  const [assignment,setAssignment] = useState({});


  useEffect(()=>{

    const getAssigmentDetailsByAssignmentId = async ()=>{

      const result = await getAssignmentDetailsByAssignmentIdService(assignmentid);

      setAssignment(result);

    }

    getAssigmentDetailsByAssignmentId();

  },[]);

  return (
    <div>
            <h3>Title : {assignment.title}</h3>
            <p>Description : {assignment.description}</p>
            <p>Due Date : {assignment.dueDate}</p>
            <p>Max Marks : {assignment.marks}</p>

            <a href={`http://localhost:8093/api/v1/download-assignment/${assignmentid}`}>
              
              <img src="/icons/pdf-icon.png"  width="50px" height="50px"/> Assignment.pdf

            </a>

            {/* {assignment} */}

    </div>
  )
}

