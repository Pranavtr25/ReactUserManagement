import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavbar from '../../Components/AdminNavbar';

const UserEdit = () => {
  const location = useLocation();
  const userData = location?.state;

  const [oldEmail, setOldEmail] = useState(location?.state?.email)

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      phone: '',
    }
  });

  useEffect(() => {
    if (userData) {
      reset({
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
      });
    }
  }, [userData, reset]);

  const handleEdit = async (data) => {
    try {
      const { username, email, phone } = data;
      console.log(username, phone, email);
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/editUser`,{
        email,
        username,
        phone,
        oldEmail
      })
      if(response.data?.success){
        navigate('/adminHome')
        toast.success(response.data?.message)
      } 

    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(`error editing user \n ${error}`);
    }
  };

  return (
    <>
      <AdminNavbar admin='Pranav' />
      <hr />
      <div className='h-screen bg-[#374152] w-[100%] pt-20'>
        <div className="max-w-lg mx-auto mt-10 p-8 bg-[#1f2a38] shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-[#9ca3a6] mb-8 text-center font-mono">Edit User Details</h2>
          <form method='post' onSubmit={handleSubmit(handleEdit)}>
            <div className="mb-6">
              <label className="block text-lg font-semibold text-[#9ca3a6] mb-2">Name:</label>
              <input
                {...register('username', {
                  required: 'Username is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_]{3,}$/,
                    message: 'Username should be at least 3 characters'
                  }
                })}
                type="text"
                className="w-full px-4 py-2 border border-[#9ca3a6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9ca3a6]"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-lg font-semibold text-[#9ca3a6] mb-2">Email:</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="w-full px-4 py-2 border border-[#9ca3a6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9ca3a6]"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
              <label className="block text-lg font-semibold text-[#9ca3a6] mb-2">Phone Number:</label>
              <input
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Length of the phone number should be 10.'
                  }
                })}
                type="text"
                className="w-full px-4 py-2 border border-[#9ca3a6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9ca3a6]"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full my-5 px-4 py-2 bg-[#6f7d96] text-white font-bold rounded-md hover:bg-[#5c677b] focus:outline-none focus:ring-2 focus:ring-[#9ca3a6]"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserEdit;
