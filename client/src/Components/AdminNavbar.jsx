import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminLogout } from '../redux/admin/adminSlice'

const AdminNavbar = ({admin}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAdminLoggedIn = useSelector((state) => state?.admin?.isAdminLoggedIn)

    const logoutUser = () => {
        dispatch(adminLogout())
        console.log(`adminlogout is loggedin : ${isAdminLoggedIn}`)
        localStorage.removeItem('adminToken')
        navigate('/adminLogin')
    }

  return (
    <>
        <div className='h-[60px] w-full bg-[#111826] flex justify-between items-cent sticky top-0'>
            <div>
                <p className='text-4xl font-bold font-mono mx-10 text-white'>Users</p>
            </div>
            <div className='flex items-center'>
                <div className='mx-5 text-white'>
                    <p>Hello, {admin} !</p>
                </div>
                <div className='mx-4 rounded px-4 py-2 cursor-pointer shadow-2xl bg-[#85bdc0] hover:bg-[#6c9a9d]'>
                    <p onClick={logoutUser}>Logout</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default AdminNavbar