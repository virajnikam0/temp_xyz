import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone' 


export default function UserDropZone({value,onChange,error}) {

    const [assignmentImg, setAssignmentImg] = useState();

    const onDrop = useCallback((files)=>{
        console.log(files);
        onChange(files);
    },[onChange]);


   const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections} = useDropzone({
                                                                                                    onDrop,
                                                                                                    maxFiles:1,
                                                                                                    multiple:false,
                                                                                                    validator: fileSizeAndTypeValidator
                                                                                                });


     function fileSizeAndTypeValidator(file) {
    const errors = [];
    if (file.size > 50 * 1024 * 1024) {
      console.log("File size greater than 50MB");
      errors.push({
        code: "name-too-small",
        message: `Upload file less than 50MB`,
      });
    }

     const allowedTypes = ['application/pdf', 'application/zip', 'application/x-zip-compressed'];

    if(!allowedTypes.includes(file.type)){
        
        console.log("File type : ", file.type);
        errors.push({
        code: "name-too-small",
        message: `only pdf and zip files are accepted`,
      });
    }
    else 
    {
        if(file.type == 'application/pdf')
        {
            setAssignmentImg("pdf-icon.png");
        }
        else 
        {
            setAssignmentImg("zip-icon.png");
        }
    }


    return errors.length > 0 ? errors : null;
  }


  const formatFileSize = (size) => {
            if (size < 1024) return `${size} bytes`;
            if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
            return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const files=acceptedFiles.map((file,index)=>{
        return (
            <div className='file-data' key={index}>
                <img className='pdf-icon' src={`/icons/${assignmentImg}`} alt="pdf-icon" />
                <p>{file.name}-{file.size}</p>
            </div>
        )
    })

     const fileRejectionMessage = fileRejections.map((rejection,index) => {
            // return <li key={index}> {errors.message} </li>
            return (
            <section key={index}>
                {rejection.errors.map((error, i) => (
                <p key={i} style={{ color: 'red' }}>{error.message}</p>
                ))}
            </section>);
        })

    return (
    <div >
        <div className='file-container'>
            <div className='root-file' {...getRootProps()}>
                <input {...getInputProps()} />
                    {
                        isDragActive ? <p>Drop the files here</p>
                                     :  <p>Drag and drop some files here,or click to select file</p>
                    }
            </div>
        </div>
        <div className='mt-5'>
            {files}
        </div>

        <ul>
            {fileRejectionMessage}
        </ul>

        {error && <p style={{color : 'red'}}>{error.message}</p>}
        
    </div>
  )
}
