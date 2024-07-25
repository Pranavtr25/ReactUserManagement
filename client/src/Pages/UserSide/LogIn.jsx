import React from "react";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { signIn } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const LogIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const logIn = async (data) => {
    try{
      const {email, password} = data
      console.log(email,password)
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/login`,{
        email,
        password
      })
      // toast.success('signedIn successfully')
      console.log(response.data)
      if(response.data?.success){
        localStorage.setItem('token', JSON.stringify(response?.data?.token))
        dispatch(signIn())
        navigate('/home')
      }
    } catch(error) {
      reset({
        email : '',
        password : ''
      })
      toast.error(error?.response?.data?.message)
      console.log(`error in login response : \n ${error}}`)
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-300">
        <div className="h-auto w-[85%] md:w-[60%] lg:w-[40%] bg-zinc-700 justify-center flex rounded-lg shadow-2xl">
          <ToastContainer/>
          <form action="" onSubmit={handleSubmit(logIn)}>
            <div className="flex text-center justify-center my-10">
              <p className="font-mono font-extrabold text-4xl text-white">
                Log In
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
              className="text-slate-300 border rounded py-2 px-5 my-5 md:text-lg hover:bg-white hover:text-slate-800"
            >
              Log In
            </button>
            <div className="mb-10">
              <p className="text-slate-300 md:text-lg">
                Don't have an account? 
                <Link to="/signup">
                  <span className="text-blue-500 hover:text-blue-600 ml-1">
                    signup
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
