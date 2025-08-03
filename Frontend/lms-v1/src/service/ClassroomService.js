import axios from 'axios';

const API_URL = 'http://localhost:8091/api/v1'


export async function createClassroomService(data)
{
    try{
             const token = sessionStorage.getItem('token');
             const url= `${API_URL}/create-classroom`;

             const body = {
                'title' : data.title, 
                'description' : data.description,
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

export async function  myCreatedClassroomService()
{
    try
    {
             const token = sessionStorage.getItem('token');
             const url= `${API_URL}/created-classroom`;


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

export async function getClassroomDetailsByClassroomIdService(id){
    try {
        const token = sessionStorage.getItem('token');
        const url= `${API_URL}/classroom-details/${id}`;
        
        const response=await axios.get(url,{
              headers : {
                'Authorization' : `Bearer ${token}`
              }
        })

        return response.data;
    } catch (e) {
        console.log(e);
        return e.response.data;
    }
}