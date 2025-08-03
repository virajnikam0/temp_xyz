import React from 'react'
import Header from './commons/Header'
import Sidebar from './commons/Sidebar'
import Content from './commons/Content'
import './admin.css'

export default function AdminRender() {
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
