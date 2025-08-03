import axios from 'axios';

const API_URL = 'http://localhost:8091/api/v1'

export async function joinClassroomService(data)
{
    try{
             const token = sessionStorage.getItem('token');
             const url= `${API_URL}/join-classroom`;

             const body = {
                
                'classroomCode' : data.classroomCode
             }

             const response = await axios.post(url,body,{
                headers : {
                'Authorization' : `Bearer ${token}`
                }
             })
            
             return response.data;

    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }
}

export async function getJoinedClassroomService()
{
    try
    {
        const token = sessionStorage.getItem('token');
        const url = `${API_URL}/enrolled-classroom`;

        const response = await axios.get(url,{
                headers : {
                'Authorization' : `Bearer ${token}`
                }
             })
            
             return response.data;
    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }
}


export async function getPendingEnrollmentService()
{
    try{
             const token = sessionStorage.getItem('token');
             const url= `${API_URL}/enrollment-status`;

             const response = await axios.get(url,{
                headers : {
                'Authorization' : `Bearer ${token}`
                }
             })
            
             return response.data;
    }
    catch(e)
    {
         console.log(e);
        return e.response.data;
    }
}

export async function getPendingEnrollmentByClassroomIdService(id)
{
    try{
             const token = sessionStorage.getItem('token');
             const url= `${API_URL}/get-pending-enrollments/${id}`;

             const response = await axios.get(url,{
                headers : {
                'Authorization' : `Bearer ${token}`
                }
             })
            
             return response.data;
    }
    catch(e)
    {
         console.log(e);
        return e.response.data;
    }
}


export async function getApprovedEnrollmentByClassroomIdService(id)
{
    try{
             const token = sessionStorage.getItem('token');
             const url= `${API_URL}/get-approved-enrollments/${id}`;

             const response = await axios.get(url,{
                headers : {
                'Authorization' : `Bearer ${token}`
                }
             })
            
             return response.data;
    }
    catch(e)
    {
         console.log(e);
        return e.response.data;
    }
}

export async function approveEnrollmentByClassroomIdAndStudentIdService(classroomId, studentId)
{
    try{
             const token = sessionStorage.getItem('token');
             const url= `${API_URL}/approve-student`;

             const body = {
                            'classroomId' : classroomId, 
                            'studentId' : studentId
                        };

             const response = await axios.post(url,body,{
                headers : {
                'Authorization' : `Bearer ${token}`
                }
             })
            
             return response.data;
    }
    catch(e)
    {
         console.log(e);
        return e.response.data;
    }
}

export async function rejectEnrollmentByClassroomIdAndStudentIdService(classroomId, studentId)
{
    try{
             const token = sessionStorage.getItem('token');
             const url= `${API_URL}/reject-student`;

             const body = {
                            'classroomId' : classroomId, 
                            'studentId' : studentId
                        };

             const response = await axios.post(url,body,{
                headers : {
                'Authorization' : `Bearer ${token}`
                }
             })
            
             return response.data;
    }
    catch(e)
    {
         console.log(e);
        return e.response.data;
    }
}