import React from 'react'
import Header from './commons/header'
import Sidebar from './commons/Sidebar'
import './user.css'
import Content from './commons/Content'

export default function UserRender() {
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
