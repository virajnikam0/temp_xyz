import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { approveEnrollmentByClassroomIdAndStudentIdService, getPendingEnrollmentByClassroomIdService, rejectEnrollmentByClassroomIdAndStudentIdService } from '../../service/StudentService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function PendingStudents() {

    const {id} = useParams();
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertColor, setAlertColor] = useState(false);

    const [pendingEnrollments,setPendingEnrollments] = useState([]);
    
    const getPendingEnrollmentsByClassroomId = async ()=>{
            
        const result = await getPendingEnrollmentByClassroomIdService(id);
            
        console.log("Pending Enrollments : ",result.data);

        setPendingEnrollments(result.data);
      
            
      }
    
    const statusBodyTemplate = (rowData) => {
    return rowData.status === 'D' ? 'Pending' : 
           rowData.status === 'R' ? 'Rejected' : rowData.status;
    };

    
    const handleAccept = async (data) => {
        console.log("Handle Accept : ",data);

        var studentId = data.studentId;

        const result = await approveEnrollmentByClassroomIdAndStudentIdService(id,studentId);

        if(result.statusCode != 200)
        {
            setAlert(true);
            setAlertMsg(result.message);
            setAlertColor(false);
        }
        else 
        {
          setAlert(true);
          setAlertMsg(result.message);
          setAlertColor(true);
          getPendingEnrollmentsByClassroomId();
        }


    }

    const handleReject = async (data) => {
        console.log("Handle Reject : ",data);

        var studentId = data.studentId;
        const result = await rejectEnrollmentByClassroomIdAndStudentIdService(id,studentId);

        if(result.statusCode != 200)
        {
            setAlert(true);
            setAlertMsg(result.message);
            setAlertColor(false);
        }
        else 
        {
          setAlert(true);
          setAlertMsg(result.message);
          setAlertColor(true);
          getPendingEnrollmentsByClassroomId();
        }
    }


    const actionBodyTemplate = (rowData) => {
      return (
              <div className="d-flex gap-2">
                <button className="btn btn-success btn-sm" onClick={() => handleAccept(rowData)}>Accept</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleReject(rowData)}>Reject</button>
              </div>
            );
    };

    useEffect(()=>{
    
              getPendingEnrollmentsByClassroomId();
    
    },[]);

  return (
    <div>
        

        {alert && (
        <div
          className={
            alertColor
              ? "alert alert-success alert-dismissible fade show"
              : "alert alert-danger alert-dismissible fade show"
          }
          role="alert"
        >
          {alertMsg}
          <button
            type="button"
            onClick={() => setAlert(false)}
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}


        <div className='container mt-5'>
                        <DataTable value={pendingEnrollments} stripedRows showGridlines size='small'
                                    paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                                    emptyMessage="No Pending enrollments"  
                        >
                            <Column field="studentName" header="Student Name"  sortable ></Column>
                            <Column field="emailId" header="Email"  sortable ></Column>
                            
                            <Column field="status" header="Status" sortable body={statusBodyTemplate}></Column>
                            <Column header="Action" body={actionBodyTemplate}></Column>
                        </DataTable>
        </div>

    </div>
  )
}
