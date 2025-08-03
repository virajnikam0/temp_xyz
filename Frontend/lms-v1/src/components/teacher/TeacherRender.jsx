import React from 'react'
import Header from './commons/Header'
import Sidebar from './commons/Sidebar'
import Content from './commons/Content'
import './teacher.css'

export default function TeacherRender() {
  return (
    <div>

        <Header />

        <div className='sidebar-x-content'>
          <Sidebar />

          <Content />

        </div>

    </div>
  )
}
