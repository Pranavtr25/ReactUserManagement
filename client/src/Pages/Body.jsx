import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import SignUp from './UserSide/SignUp'
import LogIn from './UserSide/LogIn'
import AdminLogin from './AdminSide/AdminLogin'
import AdminHome from './AdminSide/AdminHome'
import Home from './UserSide/Home'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signIn } from '../redux/user/userSlice'
import UserEdit from './AdminSide/UserEdit'
import { adminSignIn } from '../redux/admin/adminSlice'
import CheckAdmin from './CheckAdmin'

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL

const Body = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        // alert('req enter')
        async function fetchData(){
            const JWT = localStorage.getItem('token')
            console.log(".............")
            const response = await axios.post(`${VITE_SERVER_URL}/user/fetchUserData`,{JWT})
            console.log(".............")
            console.log(response)
            // const {username, email, img_url, phone} = response.data?.userData;
            if(response?.data?.success){
                dispatch(signIn())
            }
            const adminToken = localStorage.getItem('adminToken')
            // alert(`adminToken : \n ${adminToken}`)
            if(adminToken){
                dispatch(adminSignIn())
            }
        }
        fetchData()
    },[])

    const adminToken = localStorage.getItem('adminToken')
    console.log(`adminToken : \n ${adminToken}`)

    const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn)
    console.log(`isLoggedIn : ${isLoggedIn}`)

    const isAdminLoggedIn = useSelector((state) => state?.admin?.isAdminLoggedIn)
    console.log(`isAdminLoggedIn : ${isAdminLoggedIn}`)

    const appRouter = createBrowserRouter([
        {
            path : '/',
            element :  isLoggedIn ? <Navigate to="/home" /> : <LogIn />
        },
        {
            path : '/signup',
            element : isLoggedIn ? <Navigate to={'/home'}/> : <SignUp/>
        },
        {
            path : '/home',
            element : isLoggedIn ? <Home/> : <Navigate to={'/'}/>
        },
        {
            path : '/adminLogin',
            element : isAdminLoggedIn ? <Navigate to={'/adminHome'}/> : <AdminLogin/>
        },
        {
            path : '/adminHome',
            element : isAdminLoggedIn ? <AdminHome/> : <CheckAdmin route = '/adminHome'/>
        },
        {
            path : '/userEdit',
            element : isAdminLoggedIn ?  <UserEdit/> : <CheckAdmin route = '/userEdit'/>
        }
    ])
  return <RouterProvider router={appRouter}/>
}

export default Body