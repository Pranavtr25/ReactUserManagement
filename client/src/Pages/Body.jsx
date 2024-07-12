import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './UserSide/SignUp'
import LogIn from './UserSide/LogIn'
import AdminLogin from './AdminSide/AdminLogin'
import AdminHome from './AdminSide/AdminHome'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path : '/',
            element : <LogIn/>
        },
        {
            path : '/signup',
            element : <SignUp/>
        },
        {
            path : '/adminLogin',
            element : <AdminLogin/>
        },
        {
            path : '/adminHome',
            element : <AdminHome/>
        }
    ])
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body