import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentDetailsByAssignmentIdService } from "../../service/AssignmentService";
import { Controller, useForm } from "react-hook-form";
import UserDropZone from "./UserDropZone";

export default function AddStudentAssignment() {
  const { id, assignmentid } = useParams();

  const [assignment, setAssignment] = useState({});

  const { register, handleSubmit, formState, reset, control } = useForm();

  const { errors, isSubmitting } = formState;

  const formSubmit =  (data) => {
    console.log(data);

  }

  useEffect(() => {
    const getAssigmentDetailsByAssignmentId = async () => {
      const result = await getAssignmentDetailsByAssignmentIdService(
        assignmentid
      );

      console.log("Assignment Details : ", result);

      setAssignment(result);
    };

    getAssigmentDetailsByAssignmentId();
  }, []);

  return (
    <div>
      <div className="container mt-2">
        <h3>
          Add Assignment
          {/* 
            Classroom ID : {id}

            Assignment ID : {assignmentid} */}
        </h3>

        <div className="main-container">
          <div className="container">
            <h3>Title : {assignment.title}</h3>
            <p>Description : {assignment.description}</p>
            <p>Due Date : {assignment.dueDate}</p>
            <p>Marks : {assignment.marks}</p>

            <a
              href={`http://localhost:8093/api/v1/download-assignment/${assignmentid}`}
            >
              <img src="/icons/pdf-icon.png" width="50px" height="50px" />{" "}
              Assignment.pdf
            </a>
          </div>

          <div className="container">
            <h3>Add Submission</h3>
            <form onSubmit={handleSubmit(formSubmit)} noValidate>
              <div className="drop-zone mt-5">
                <Controller
                  name="assignment"
                  control={control}
                  rules={{ required: "File is required" }}
                  render={({ field, fieldState }) => (
                    <UserDropZone
                      value={field.value}
                      onChange={field.onChange}
                      error={fieldState.error}
                    />
                  )}
                />
              </div>
              <div className="form-actions">
                  <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
