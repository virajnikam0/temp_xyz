import React, { useEffect, useState } from 'react'
import { getApprovedEnrollmentByClassroomIdService } from '../../service/StudentService';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function EnrolledStudents() {

     const {id} = useParams();
     const [approvedEnrollments,setApprovedEnrollments] = useState([]);

    //  getApprovedEnrollmentByClassroomIdService

    const getApprovedEnrollmentsByClassroomId = async ()=>{
        const result = await getApprovedEnrollmentByClassroomIdService(id);

        console.log("Approved enrollments : ",result.data);

        setApprovedEnrollments(result.data);

    }

    useEffect(()=>{

        getApprovedEnrollmentsByClassroomId();

    },[]);
  return (
    <div>
        

        <div className='container mt-5'>

            <DataTable value={approvedEnrollments} stripedRows showGridlines size='small'
                                                paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                                                emptyMessage="No enrollments"  
                                    >
                <Column field="studentName" header="Student Name"  sortable ></Column>
                <Column field="emailId" header="Email"  sortable ></Column>
                                        
                                        
            </DataTable>

        </div>
    </div>
  )
}
