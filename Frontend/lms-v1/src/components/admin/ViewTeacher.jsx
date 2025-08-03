// import React, { useEffect, useState } from 'react'
// import { getRegisteredTeacherService } from '../../service/AuthService';
// import {DataTable} from 'primereact/datatable';
// import {Column} from 'primereact/column'

// export default function ViewTeacher() {

//   const [teachers, setTeachers] = useState([]);

//   useEffect(()=>{

//     const fetchRegisteredTeachers = async () =>{
        
//       const result = await getRegisteredTeacherService();

//       setTeachers(result.data);
     
//     }

//     fetchRegisteredTeachers();
//   },[]);

//   return (
//     <div>
//         <h2>Registered Teachers </h2>


//       <div className='container mt-5'>
//           <DataTable value={teachers} stripedRows showGridlines size='small'
//                       paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} 
//                       emptyMessage="No Teacher registered yet"  
//           >
//               <Column field="name" header="Name"  sortable ></Column>
//               <Column field="email" header="Email ID" sortable ></Column>
//           </DataTable>
//         </div>
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react'
import { getRegisteredTeacherService } from '../../service/AuthService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function ViewTeacher() {

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchRegisteredTeachers = async () => {
      try {
        const result = await getRegisteredTeacherService();
        setTeachers(result.data);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
        setTeachers([]); 
      }
    };
    fetchRegisteredTeachers();
  }, []);

  return (
    <div className='p-5'>
      <div className='card p-4 shadow-sm'>
        <div className='text-center mb-4'>
          <h2 className='text-primary'>Registered Teachers</h2>
          <p className='text-muted'>A list of all registered teachers in the system.</p>
        </div>
        
        <div className='table-responsive'>
          <DataTable
            value={teachers}
            stripedRows
            showGridlines
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage='No teachers registered yet'
            className='p-datatable-sm'
          >
            <Column field="name" header="Name" sortable></Column>
            <Column field="email" header="Email ID" sortable></Column>
          </DataTable>
        </div>
      </div>
    </div>
  )
}