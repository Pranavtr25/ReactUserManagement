import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL

const Home = () => {
    const [userData, setUserData] = useState('')
    const [fileValue, setFileValue] = useState(null)
    const [showImage, setShowImage] = useState(null)

    useEffect(() => {
        async function fetchData(){
            const JWT = localStorage.getItem('token')
            const response = await axios.post(`${VITE_SERVER_URL}/user/fetchUserData`,{JWT})
            console.log(response)
            const {username, email, img_url, phone} = response?.data?.userData;
            setUserData({
                username,
                email,
                img_url,
                phone
            })
        }
        fetchData()
    },[])

    const handleFileChange = (e) => {
        const value = e.target.files[0]
        setFileValue(value)
        setShowImage(value)
    }
    console.log(fileValue)

    const submitHandler = async (e)=>{
        try {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const JWT = localStorage.getItem('token')
            if(JWT){
                formData.append('userJWT', JWT)
            }
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/uploadImage`,formData)
            console.log(response)
            if(response.data?.success){
                toast.success(response.data?.message)
                setUserData((userdata) => ({...userdata,img_url : response.data?.filename}))
                console.log("userdata :userdata")
                console.log(userData)
                setFileValue('')
            }else {
                toast.error(response.data?.message)
            }
        } catch (error) {
            toast.error(error.response.data?.message)
            console.log(error.response)
            console.log(`error while submiting the image \n ${error}`)
        }
    }

  return (
    <>
        <Navbar username = {userData?.username}/>
        <div className='h-screen w-full bg-[#C4DFE6] flex items-center justify-center'>
            <ToastContainer />
        <div className='bg-[#05393c] p-8 rounded shadow-lg flex items-center justify-center'>
            <div className='m-10 flex flex-col items-center'>
                <form action="" onSubmit={submitHandler}>

                    <img className='h-[150px] w-[200px] rounded shadow-2xl' src={showImage ? URL.createObjectURL(showImage): `${VITE_SERVER_URL}/images/${userData.img_url}`} alt="" />
                
                    {
                        fileValue && 

                        <div className='mx-4 rounded mt-5 px-4 py-2 cursor-pointer shadow-2xl bg-[#85bdc0] hover:bg-[#6c9a9d]'>
                            <input type="submit" value={'Save Image'} />
                        </div>
                    }

                    <input name='image' className='text-white mt-5 border rounded shadow-2xl cursor-pointer' onChange={handleFileChange} type="file" src="" alt="choose file" />
                </form>
            </div>
            <div>
                <h3 className='text-white px-3 bg-[#005f64] font-mono text-6xl mb-4 rounded-xl shadow-2xl'>User Details</h3>
                <p className='text-white font-mono text-2xl'>Username: {userData?.username}</p>
                <p className='text-white font-mono text-2xl'>Email: {userData?.email}</p>
                <p className='text-white font-mono text-2xl'>Phone Number: {userData?.phone}</p>
            </div>
        </div>
        </div>
    </>
  )
}

export default Home