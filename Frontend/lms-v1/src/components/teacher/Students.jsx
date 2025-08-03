import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { approveEnrollmentByClassroomIdAndStudentIdService, getPendingEnrollmentByClassroomIdService, rejectEnrollmentByClassroomIdAndStudentIdService } from '../../service/StudentService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function Students() {

    const {id} = useParams();
    


  return (
    <div>
        
      <div className='enrollment-status'>
        <button className='btn btn-primary'>
          <NavLink className="classroom-actions" to={`/teacher/classroom/${id}/students`} >Enrolled Students</NavLink>
        </button>

        <button className='btn btn-warning'>
          <NavLink className="classroom-actions" to={`/teacher/classroom/${id}/students/pending`} >Pending Students</NavLink>
        </button>
      </div>

        <Outlet />

        
    </div>
  )
}
