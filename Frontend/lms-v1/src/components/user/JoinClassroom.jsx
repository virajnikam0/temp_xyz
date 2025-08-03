import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getPendingEnrollmentService, joinClassroomService } from '../../service/StudentService';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column'

export default function JoinClassroom() {

    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertColor, setAlertColor] = useState(false);

    const { register, handleSubmit,setValue, formState, reset } = useForm();
      const { errors, isSubmitting } = formState;

    const [pendingEnrollments, setPendingEnrollments] = useState([]);

    const statusBodyTemplate = (rowData) => {
    return rowData.status === 'D' ? 'Pending' : 
           rowData.status === 'R' ? 'Rejected' : rowData.status;
    };

    const getPendingEnrollments = async ()=>{
      
            const result = await getPendingEnrollmentService();
      
            // console.log("Pending Enrollments : ",result.data);

            setPendingEnrollments(result.data);
      
          }


    useEffect(()=>{

        
      
          getPendingEnrollments();

    },[]);

    const formSubmit = async (data) => {
    
      // console.log("Form Data : " , data);

      
      const result = await joinClassroomService(data);
      
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
      }

      getPendingEnrollments();
    
    }


  return (
    <div>
        <h1>Join Classroom</h1>

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

      <div className="container mt-5">

          <form onSubmit={handleSubmit(formSubmit)} noValidate>

            <div className="row">
              
              <div className="col-4">
                <label htmlFor="classroomCode" className="form-label">
                  Classroom Code
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="classroomCode"
                  name="classroomCode"
                  autoComplete="off"
                  {...register("classroomCode", {
                    required: {
                      value: true,
                      message: "Classroom Code is required",
                    },
                  })}
                />
                <p className="error-message">{errors.classroomCode?.message}</p>
              </div>

              </div>
                
            <div className='row'>
              <div className='col-4 jc-upper-div'>
                  <div className="join-classroom">
                      <button type="submit" className="btn btn-primary">Create</button>
                      <button type="reset" className="btn btn-danger">Reset</button>
                </div>
              </div>

            </div>
          </form>

      </div>

      
      <div className='container mt-5'>
                <DataTable value={pendingEnrollments} stripedRows showGridlines size='small'
                            paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
                            emptyMessage="No Pending enrollments"  
                >
                    <Column field="title" header="Classroom"  sortable ></Column>
                    <Column field="classroomCode" header="Classroom code" sortable ></Column>
                    <Column field="status" header="Status" sortable body={statusBodyTemplate}></Column>
                </DataTable>
      </div>
    </div>

        
    
  )
}
