import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Dropzone from './commons/Dropzone';
import axios from 'axios';
import { createAssignmentService } from '../../service/AssignmentService';
import { useState } from 'react';

export default  function CreateAssignment() {

    const {id} = useParams();

    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertColor, setAlertColor] = useState(false);

    const {register, handleSubmit, formState ,reset,control} = useForm();

    const {errors, isSubmitting} = formState;

    const formSubmit = async (data)=>{

      const formData = new FormData();
      
     

      console.log(data);

      console.log(data.pdf[0].name);
       const token = sessionStorage.getItem('token');


          const assignmentDto = {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          marks: data.maxMarks, // assuming your backend accepts marks as double
          classroomId: id,       // from useParams()
        };

        console.log("Assignment DTO : "+JSON.stringify(assignmentDto));

        formData.append('assignmentDto', new Blob(
          [JSON.stringify(assignmentDto)],
          { type: 'application/json' }
        ));

    // Append the file
        formData.append('assignment', data.pdf[0]);
      const result = await createAssignmentService(formData);

     if(result.statusCode != 200)
     {
        setAlert(true);
        setAlertMsg("Failed to Create Assignment");
        setAlertColor(false);
     }
     else 
     {
        setAlert(true);
        setAlertMsg("Assignment created successfully");
        setAlertColor(true);
        reset();
     }

      // console.log("Response : "+result);


    }


  return (
    <div className='container'>
      
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

      <form onSubmit={handleSubmit(formSubmit)} noValidate>

          <div className="row">

            <div className="col-4">
               <label htmlFor="title" className="form-label">Title</label>
            
                <input type='text' className="form-control" id="title" name="title"
                       autoComplete="off" {...register("title", {
                                                                  required : {
                                                                                value: true,
                                                                                message: "Title is required",
                                                                },
                                          })}
                />
                <p className="error-message">{errors.title?.message}</p>
            </div>

            <div className="col-4"> 
                  <label htmlFor='description' className='form-label' >Description</label>
                  <textarea rows={4} cols={5}  className="form-control"
                            id="description" name="description" autoComplete="off"
                            {...register("description", {
                                                          required: {
                                                                        value:true,
                                                                        message: "Description is required",
                                                          },
                            })}
                  >            
                  </textarea>
                  <p className="error-message">{errors.description?.message}</p>

            </div>


            <div className="col-2">
               <label htmlFor="dueDate" className="form-label">Due date</label>
            
                <input type='date' className="form-control" id="dueDate" name="dueDate"
                       autoComplete="off" {...register("dueDate", {
                                                                  required : {
                                                                                value: true,
                                                                                message: "Due date is required",
                                                                },
                                          })}
                />
                <p className="error-message">{errors.dueDate?.message}</p>
            </div>

            <div className="col-2">
               <label htmlFor="maxMarks" className="form-label">Marks</label>
            
                <input type='number' className="form-control" id="maxMarks" name="maxMarks"
                       autoComplete="off" {...register("maxMarks", {
                                                                  required : {
                                                                                value: true,
                                                                                message: "Marks is required",
                                                                },
                                          })}
                />
                <p className="error-message">{errors.maxMarks?.message}</p>
            </div>

          </div>

          <div className='drop-zone mt-5'>
            <Controller
              name="pdf"
              control={control}
              rules={{ required: 'PDF file is required' }}

              render={({field, fieldState}) => (
                <Dropzone 
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error}
                />
              )}
            />
          </div>

          <div className='form-actions'>
              <button type='submit' className="btn btn-primary" >Submit</button>
              <button type="reset" className="btn btn-danger">Reset</button>
          </div>

      </form>

    </div>
  )
}
