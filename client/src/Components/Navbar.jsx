import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../redux/user/userSlice'

const Navbar = ({username}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn)

    const logoutUser = () => {
        dispatch(logOut())
        console.log(`logout is loggedin : ${isLoggedIn}`)
        localStorage.removeItem('token')
        navigate('/')
    }

  return (
    <>
        <div className='h-[60px] w-full bg-[#07575B] flex justify-between items-cent sticky top-0'>
            <div>
                <p className='text-4xl font-bold font-mono mx-10 text-white'>Profile</p>
            </div>
            <div className='flex items-center'>
                <div className='mx-5 text-white'>
                    <p>Hello, {username} !</p>
                </div>
                <div className='mx-4 rounded px-4 py-2 cursor-pointer shadow-2xl bg-[#85bdc0] hover:bg-[#6c9a9d]'>
                    <p onClick={logoutUser}>Logout</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar