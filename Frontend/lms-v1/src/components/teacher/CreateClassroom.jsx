import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClassroomService } from "../../service/ClassroomService";
import { useAuth } from "../../context/AuthContext";

export default function CreateClassroom() {

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertColor, setAlertColor] = useState(false);
  
  const {fetchSidebar,setFetchSidebar} = useAuth();

  const { register, handleSubmit,setValue, formState, reset } = useForm();
  const { errors, isSubmitting } = formState;
  
  const generateClassroomCode = ()=>{
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000);
    return randomSixDigit;
  }
  const [classroomCode,setClassroomCode]=useState(generateClassroomCode());
  useEffect(()=>{
    setValue("classroomCode",generateClassroomCode())
  })
  const formSubmit = async (data) => {
    console.log(data);
    setValue("classroomCode",generateClassroomCode());


    const result = await createClassroomService(data);

    if(result.statusCode != 200)
    {
        setAlert(true);
        setAlertMsg("Failed to Create classroom");
        setAlertColor(false);
    }
    else 
    {
        
        setAlert(true);
        setAlertMsg("Classroom created successfully");
        setAlertColor(true);
        setFetchSidebar(!fetchSidebar);
        reset();
    }

    reset();
  };
  return (
    <div>
      <h1>Create Classroom</h1>
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
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                autoComplete="off"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                })}
              />
              <p className="error-message">{errors.title?.message}</p>
            </div>
            <div className="col-4">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                rows={4}
                cols={5}
                className="form-control"
                id="description"
                name="description"
                autoComplete="off"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
              />
              <p className="error-message">{errors.description?.message}</p>
            </div>
            <div className="col-4">
              <label htmlFor="classroomCode" className="form-label">
                Classroom Code
              </label>
              <input
                type="number"
                className="form-control"
                readOnly
                id="classroomCode"
                name="classroomCode"
                {...register("classroomCode", {
                  required: {
                    value: true,
                    message: "Classroom code is required",
                  },
                })}
              />
              <p className="error-message">{errors.classroomCode?.message}</p>
            </div>           
          </div>
          <div className="create-classroom">
                <button type="submit" className="btn btn-primary">Create</button>
                <button type="reset" className="btn btn-danger">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}
