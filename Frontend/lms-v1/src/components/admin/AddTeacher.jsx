import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { registerTeacherService } from '../../service/AuthService';

export default function AddTeacher() {

  const {register, handleSubmit, formState ,reset} = useForm();
  const {errors, isSubmitting} = formState;

  const [alert,setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState(false);

  const formSubmit = async (data)=>{
      console.log(data);
      const result = await registerTeacherService(data);

      // console.log("Response from AXIOS : ",result);

      if(result.statusCode != 200)
      {
       
        setAlert(true);
        setAlertMsg("Failed to register teacher");
        setAlertColor(false);
      }
      else 
      {
        
        setAlert(true);
        setAlertMsg("Teacher registered successfully");
        setAlertColor(true);
        reset();
      }
  }

  return (
    <div>
        <h2>Add Teacher</h2>

        {
            alert && (

              <div className={ alertColor ? 'alert alert-success alert-dismissible fade show' : 'alert alert-danger alert-dismissible fade show' } role="alert">
                {alertMsg}
                <button type="button" onClick={()=>setAlert(false)} className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>

            )
        }

        <div className="container mt-5">

            <form onSubmit={handleSubmit(formSubmit)} noValidate>

                <div className='row'>

                    <div className="col-4">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" name="name" autoComplete='off' 
                        {...register("name", {
                            required:{
                              value : true,
                              message : 'Name is required'
                              }

                        })}
                      
                      />
                      <p className='error-message'>{errors.name?.message}</p>
                    </div>

                    <div className="col-4">
                      <label htmlFor="email" className="form-label">Email Id</label>
                      <input type="text" className="form-control" id="email" name="email" autoComplete='off'
                        {...register("email", {
                            required:{
                              value : true,
                              message : 'Email-Id is required'
                              }

                        })}
                      
                      />
                       <p className='error-message'>{errors.email?.message}</p>
                    </div>

                </div>

                <div className='teacher-register'>
                  <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                    {/* Register */}
                    
                        {
                          isSubmitting ? (

                            <>
                              <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                              <span role="status">Register</span>
                            </>

                          ) : ('Register') 
                        }

                  </button>
                  <button type='reset' className='btn btn-danger'>Reset</button>
                </div>

            </form>

        </div>
    </div>
  )
}
