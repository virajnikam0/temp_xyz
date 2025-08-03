import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getClassroomDetailsByClassroomIdService } from "../../service/ClassroomService";
import {
  getAssignmentsByClassroomIdService,
  getStudentAssignmentsByClassroomIdService,
} from "../../service/AssignmentService";

export default function StudentClassroom() {
  const { id } = useParams();

  const [classroomDetails, setClassroomDetails] = useState();

  const [assignments, setAssignments] = useState([]);

  // const getAssignments = async () => {
  //   const result = await getStudentAssignmentsByClassroomIdService(id);
  //   console.log("assignements: ", result.data);
  //   setAssignments(result.data);
  // };

  const getClassroomDetails = async () => {
    const result = await getClassroomDetailsByClassroomIdService(id);
    setClassroomDetails(result.data);

  };

  useEffect(() => {
    getClassroomDetails();
  
  }, [id]);

  return (
    <div>
      <div className="container classroom-details">
        <div>
          <h2>
            {classroomDetails?.title} - {classroomDetails?.classRoomCode}
          </h2>
          <h4>{classroomDetails?.description}</h4>
        </div>


        <div>
          {/* <NavLink to={`/user/classroom/${id}/add-assignment/${classroomDetails.assignmentid}`} className='btn btn-primary' >Add Assignment</NavLink> */}
        </div>
      </div>

      <Outlet />
      
    </div>
  );
}
