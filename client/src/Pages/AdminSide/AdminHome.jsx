import React, { useEffect, useState } from 'react';
import DropDown from '../../Components/DropDown';
import AdminNavbar from '../../Components/AdminNavbar';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AdminHome = () => {
  const [usersDetail, setUsersDetail] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsersDetail = async () => {
      try {
        const adminJWT = localStorage.getItem('adminToken');
        const usersData = await axios.post(`${VITE_SERVER_URL}/admin/fetchUsersData`, { adminJWT });
        if (usersData.data?.success) {
          setUsersDetail(usersData?.data?.userDetails);
          console.log(usersData?.data?.userDetails);
        }
      } catch (error) {
        console.log(`error fetching userdata \n ${error}`);
      }
    };
    fetchAllUsersDetail();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      console.log(`req came to delete`);
      const confirmed = window.confirm('Are you sure you want to delete this user?');
      if (confirmed) {
        const response = await axios.post(`${VITE_SERVER_URL}/admin/deleteUser`, { id });
        if (response.data?.success) {
          toast.success('User deleted successfully');
          setUsersDetail(usersDetail.filter(user => user?.id !== id));
        } else {
          toast.error('Failed to delete user');
        }
      }
    } catch (error) {
      console.log(`error deleting user \n ${error}`);
    }
  };

  const filteredUsers = usersDetail.filter((user) =>
    user?.username.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log('it is working')

  return (
    <>
      <AdminNavbar admin='Pranav' />
      <hr />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <ToastContainer />
        <div className="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((data, index) => {
              return (
                <tr key={data?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 w-[100%]">
                  <td className="px-6 py-4">{index + 1}</td>
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="pl-3">
                      <div className="text-base font-semibold">{data?.username}</div>
                      <div className="font-normal text-gray-500">
                        {data?.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{data?.phone}</td>
                  <td className="px-6 py-4">
                    <button className='mx-4 text-xl' onClick={() => navigate('/userEdit', { state: data })}><FaEdit /></button>
                    <button onClick={() => handleDelete(data?.id)} className='text-xl'><MdDeleteForever /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminHome;
