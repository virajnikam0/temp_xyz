import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Content() {
  return (
    <div className='user-content'>
        

            <Outlet />


    </div>
  )
}
