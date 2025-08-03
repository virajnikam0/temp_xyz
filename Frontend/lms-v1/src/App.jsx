import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Render from './components/landing/render'
import {Routes,Route, Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css';


import AuthProvider from './context/AuthContext'
import RouteGuard from './context/routeGuard'
import AdminRender from './components/admin/AdminRender'
import UserRender from './components/user/UserRender'
import Dashboard from './components/user/Dashboard'
import JoinClassroom from './components/user/JoinClassroom'

import AdminDashboard from './components/admin/AdminDashboard'
import AddTeacher from './components/admin/AddTeacher'
import TeacherRender from './components/teacher/TeacherRender'


import TeacherDashboard from './components/teacher/TeacherDashboard'
import CreateClassroom from './components/teacher/CreateClassroom'
import Register from './components/landing/register'
import ViewTeacher from './components/admin/ViewTeacher'
import Classroom from './components/teacher/Classroom'
import CreateAssignment from './components/teacher/CreateAssignment'
import Assignments from './components/teacher/Assignments'
import Students from './components/teacher/Students'
import ViewAssginment from './components/teacher/ViewAssignment'
import EnrolledStudents from './components/teacher/EnrolledStudents'
import PendingStudents from './components/teacher/PendingStudents'
import LoginForm from './components/landing/LoginForm'

import Home from './components/landing/home'
import StudentClassroom from './components/user/StudentClassroom'
import StudentAssignment from './components/user/StudentAssignment'
import AddStudentAssignment from './components/user/AddStudentAssignment';

function App() {
 

  return (
    <>
  <AuthProvider>

         <Routes>
  <Route path='/' element={<Render />} /> {/* Landing page */}
  <Route path='/login' element={<LoginForm />} /> {/* Login form */}
  <Route path='/register' element={<Register />} />

            
            <Route path='/admin' element={<RouteGuard allowedRoles={['ROLE_ADMIN']}>
                  <AdminRender />
                </RouteGuard>}>

                <Route path='' element={<AdminDashboard />} />
                <Route path='dashboard' element={<AdminDashboard />} />
                <Route path='add-teacher' element={<AddTeacher />} />
                <Route path='view-teacher' element={<ViewTeacher />} />
                <Route path='*' element={<AdminDashboard />} />
            </Route>


            <Route path='/user' element={<RouteGuard allowedRoles={['ROLE_USER']}>
                  <UserRender />
                </RouteGuard>}>
                <Route path='' element={<Dashboard />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='join-classroom' element={<JoinClassroom />} />
                <Route path='classroom/:id' element={<StudentClassroom />} >

                  <Route path='' element={<StudentAssignment />} />
                  <Route path='add-assignment/:assignmentid' element={<AddStudentAssignment />} />

                </Route>
                <Route path='*' element={<Dashboard />} />

            </Route>


            <Route path='/teacher' element={<RouteGuard allowedRoles={['ROLE_TEACHER']}>
                  <TeacherRender />
                </RouteGuard>}>
                <Route path='' element={<TeacherDashboard />} />
                <Route path='dashboard' element={<TeacherDashboard />} />
                <Route path='create-classroom' element={<CreateClassroom />} />
                <Route path='classroom/:id' element={<Classroom />} >
                    <Route path='' element={<Assignments />} />
                    <Route path='create-assignment'  element={<CreateAssignment />}/>
                    <Route path='students' element={<Students />} >
                        <Route path='' element={<EnrolledStudents/>}/>
                        <Route path='pending' element={<PendingStudents />}/>
                    </Route>
                    <Route path='view-assignment/:assignmentid' element={<ViewAssginment />} />
                </Route>
                <Route path='*' element={<Dashboard />} />

            </Route>
        

      </Routes>
    </AuthProvider>
      
    </>
  )
}

export default App
