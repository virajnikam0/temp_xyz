import React, { useCallback } from 'react'

import {useDropzone} from 'react-dropzone';

export default function Dropzone({value,onChange,error}) {
  
  const onDrop = useCallback((files)=>{
    
            console.log(files);
            onChange(files);

        },[onChange]);

    function fileSizeAndTypeValidator(file)
    {
    
            const errors = [];
            if(file.size > (1024*1024))
            {
                console.log("File size greater than 2MB");
                errors.push ({
                    code: "name-too-small",
                    message: `Upload file less than 2MB`
                    });
            }
    
            if(file.type !== 'application/pdf')
            {
                errors.push({
                    code: "not-pdf-file",
                    message: `Only PDF files are accepted`
                });
            }
    
            return errors.length > 0 ? errors : null;
    
    }
    const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections} = useDropzone({
                                                                                                    onDrop,
                                                                                                    maxFiles:1,
                                                                                                    multiple:false,
                                                                                                    validator: fileSizeAndTypeValidator
                                                                                                });
    
    const formatFileSize = (size) => {
            if (size < 1024) return `${size} bytes`;
            if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
            return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };                                                                                            
  
    const files = acceptedFiles.map( (file,index) => {
            // return <li key={index}>{file.name} - {formatFileSize(file.size)}</li>;

            return (
            <div className='file-data' key={index}>
                <img className='pdf-icon' src="/icons/pdf-icon.png" alt="pdf-icon"  />
                <p>{file.name} - {formatFileSize(file.size)}</p>
            </div>
            );
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

        <div className="file-container">
            <div className="root-file" {...getRootProps()}>

                <input {...getInputProps()} />

                {
                    isDragActive ? <p>Drop the files here ...</p> 
                                 : <p>Drag 'n' drop some files here, or click to select files</p> 
                                  
                }

            </div>
        </div>

        <div className='mt-5'>
            
            {files}
        </div>

        <ul>
            {fileRejectionMessage}
        </ul>

        {error && <p style={{ color: 'red' }}>{error.message}</p>}

    </div>
  )
}
