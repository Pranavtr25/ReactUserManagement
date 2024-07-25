import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminSignIn } from '../redux/admin/adminSlice'

const CheckAdmin = ({route}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        // alert('req enter')
        async function fetchData(){
            const adminToken = localStorage.getItem('adminToken')
            // alert(`adminToken : \n ${adminToken}`)
            if(adminToken){
                dispatch(adminSignIn())
                navigate(route)
            }else{
                navigate('/adminLogin')
            }
        }
        fetchData()
    })

}

export default CheckAdmin