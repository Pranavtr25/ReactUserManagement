import axios from 'axios'
import React from "react";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { signIn } from '../../redux/user/userSlice';

const SignUp = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const signUp = async (data) => {
    try {
      const {userName, email, phoneNumber, password} = data
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/register`,{
        userName,
        email,
        phoneNumber,
        password
      })
      console.log('response got')
      console.log(response)
      if(response.data?.success){
        localStorage.setItem('token', JSON.stringify(response?.data?.token))
        dispatch(signIn())
        navigate('/home')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(`error in signup response  : ${error}`)
      reset({
        userName : '',
        email : '',
        phoneNumber : '',
        password : ''
      })
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-300">
        <div className="h-auto w-[85%] md:w-[60%] lg:w-[40%] bg-zinc-700 justify-center flex  rounded-lg shadow-2xl">
          <ToastContainer/>
          <form action="" method="post" onSubmit={handleSubmit(signUp)}>
            <div className="flex text-center justify-center my-10">
              <p className="font-mono font-extrabold text-4xl text-white">
                Sign Up
              </p>
            </div>
            <div>
              <div className="text-slate-300 mt-10">
                <label htmlFor="userName">Username</label>
                <br />
                <input
                  {...register('userName',{
                    required : 'Username is required',
                    pattern : {
                      value :  /^[a-zA-Z0-9_]{3,}$/,
                      message : 'Username should be atleast 3 characters'
                    }
                  })}
                  type="text"
                  id="userName"
                  className="focus:outline-none focus:ring-2 focus:ring-slate-400 text-black mt-1 w-[100%] rounded px-4"
                />
                {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>}
              </div>
              <div className="text-slate-300 mt-5">
                <label htmlFor="email">Email</label>
                <br />
                <input
                  {...register('email',{
                    required : 'email is required',
                    pattern : {
                      value : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message : 'Invalid email address'
                    }
                  })}
                  type="text"
                  id="email"
                  className="focus:outline-none focus:ring-2 focus:ring-slate-400 text-black mt-1 w-[100%] rounded px-4"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="text-slate-300 mt-5">
                <label htmlFor="phoneNumber">Phone</label>
                <br />
                <input
                {...register('phoneNumber',{
                    required : 'Phone number is required',
                    pattern : {
                        value : /^[0-9]{10}$/,
                        message : 'Length of the phone number should be 10.'
                    }
                })}
                  type="number"
                  id="phoneNumber"
                  className="focus:outline-none focus:ring-2 focus:ring-slate-400 text-black mt-1 w-[100%] rounded px-4"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
              </div>
              <div className="text-slate-300 mt-5">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  {...register('password',{
                    required :'Password is required',
                    minLength : {
                        value : 6,
                        message : 'Password should be atleast 6 characters.'
                    }
                  })}
                  type="password"
                  id="password"
                  className="focus:outline-none focus:ring-2 focus:ring-slate-400 text-black mt-1 w-[100%] rounded px-4"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>
            </div>
            <button
              type="submit"
              className="text-slate-300 border rounded py-2 px-5 my-5 md:text-lg hover:bg-white hover:text-slate-800"
            >
              Sign Up
            </button>
            <div className="mb-10">
              <Link to="/">
                <p className="text-slate-300 md:text-lg">
                  Already have an account?{" "}
                  <span className="text-blue-500 hover:text-blue-600">
                    login
                  </span>
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
