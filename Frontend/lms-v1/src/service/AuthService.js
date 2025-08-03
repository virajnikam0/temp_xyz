import axios from 'axios'

const API_URL = 'http://localhost:8090/api/v1'

export async function loginService(data)
{
    try 
    {

        const url = `${API_URL}/login`

        const body = {
                   'username' : data.username,
                   'password' : data.password
        }
    
        const response = await axios.post(url,body);      
    
        return response.data;
    }
    catch(e)
    {
        console.log('Exception occurred');
        console.log(e);
    }


}
export async function registerService(data){
    try {
        const url= `${API_URL}/register`;
        const body={'name':data.name,'email':data.email,'password':data.password};
        const response=await axios.post(url,body);
        return response.data;

    } catch (e) {
        console.log('Exception occurred');
        console.log(e);
    }
}


export async function registerTeacherService(data)
{
    let response = "";
    try
    {
        const token = sessionStorage.getItem('token');
        const url= `${API_URL}/register-teacher`;
        const body={
                        'name':data.name,
                        'email':data.email,
                        'password':'Teacher@123'
                };
        response = await axios.post(url,body,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch(e)
    {
       console.log(e);
        return e.response.data;
    }
}

export async function getRegisteredTeacherService()
{
    let response = "";

    try{
            const token = sessionStorage.getItem('token');
            const url= `${API_URL}/registered-teachers`;

            response = await axios.get(url,{
                headers : {
                'Authorization' : `Bearer ${token}`
                }
            });

            return response.data;
    }
    catch(e)
    {
        console.log(e);
        return e.response.data;
    }
}