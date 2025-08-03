import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getClassroomDetailsByClassroomIdService } from "../../service/ClassroomService";

export default function Classroom() {
  const { id } = useParams();
  const [classroomDetails,setClassroomDetails]=useState();
  
  const getClassroomDetails = async () =>{
    const result=await  getClassroomDetailsByClassroomIdService(id);
    setClassroomDetails(result.data);
   
  }
  
  useEffect(() => {
    getClassroomDetails();
  }, [id]);
  
  return (
    <div>
      <div className="container classroom-details">
        
        <div >
          <h2>{classroomDetails?.title} - {classroomDetails?.classRoomCode}</h2>
          <h4>{classroomDetails?.description}</h4>
        </div>

        <div className="classroom-actions">
            <button className='btn btn-success'> <NavLink className="classroom-actions" to={`/teacher/classroom/${id}`} >Home</NavLink> </button>
            <button className="btn btn-primary"> <NavLink className="classroom-actions" to={`/teacher/classroom/${id}/students`} >  Students </NavLink> </button>
            <button className="btn btn-danger"><NavLink className="classroom-actions" to={`/teacher/classroom/${id}/create-assignment`} >Add Assignment</NavLink></button>
            {/* <button className="btn btn-danger"><NavLink className="classroom-actions" to={`/teacher/classroom/${id}/view-assginment`} >View Assignment</NavLink></button> */}
        </div>
          
      </div>

      <div className="container mt-3"> 
          <Outlet />
      </div>
      
    </div>
  );
}
