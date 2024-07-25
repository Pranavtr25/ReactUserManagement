import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminSignIn } from "../../redux/admin/adminSlice";


const AdminLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  
  const adminLogin = async (data) => {
    try { 
      
      const {email, password} = data
      console.log(email)
      console.log(password)
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/login`,{
        email,
        password
      })
      console.log("dfnfi")
      console.log(response.data)
      console.log(response?.data?.token)
      if(response.data?.success){
        // toast.success('logged in succesfully')
        localStorage.setItem('adminToken', JSON.stringify(response?.data?.token))
        dispatch(adminSignIn());
        console.log(1)

        navigate('/adminHome')
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log(`error fetching admin details \n ${error}`)
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#eef9dc]">
        <div className="h-auto w-[85%] md:w-[60%] lg:w-[40%] bg-[#69945c] justify-center flex rounded-lg shadow-2xl">
          <form action="" onSubmit={handleSubmit(adminLogin)}>
            <ToastContainer/>
            <div className="flex text-center justify-center my-10">
              <p className="font-mono font-extrabold text-4xl text-white">
                Admin Login
              </p>
            </div>
            <div>
              <div className="text-slate-300 mt-5">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  id="email"
                  className="focus:outline-none focus:ring-2 focus:ring-slate-400 text-black mt-1 w-[100%] rounded px-4"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="text-slate-300 mt-5">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password should be atleast 6 characters.",
                    },
                  })}
                  type="password"
                  id="password"
                  className="focus:outline-none focus:ring-2 focus:ring-slate-400 text-black mt-1 w-[100%] rounded px-4"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-[#eef9dc] border rounded py-2 px-5 my-5 md:text-lg hover:bg-white hover:text-[#69945c]"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
