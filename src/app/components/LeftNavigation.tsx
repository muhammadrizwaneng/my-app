'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';


const LeftNavigation: React.FC = () => {
    const selectUserInfo = (state: any) => state?.user;
    const userData = useSelector(selectUserInfo);
    const email = userData.email
    const router = useRouter();
    const dispatch = useDispatch()


  // Handle navigation based on button click
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const handleLogout = ()=>{
    Cookies.remove("tokenforpython")
    dispatch(logout())
    
  }

  return (
    <div className="left-navigation">
      <ul>
        <li>
          <button onClick={() => handleNavigation('/profile')}>My Profile</button>
        </li>
        {email == "admin@gmail.com" && (
            <li>
            <button onClick={() => handleNavigation('/users')}>Get All Users</button>
            </li>
        )}
        <li>
        <button onClick={() => handleNavigation('/UpdateUserForm?field=name')}>Update Name</button>
        </li>
        <li>
        <button onClick={() => handleNavigation('/UpdateUserForm?field=number')}>Update Phone Number</button>
        </li>
        <li>
        <button onClick={() => handleNavigation('/UpdateUserForm?field=password')}>Update Password</button>
        </li>
        <li>
            <button onClick={() => handleNavigation('/UpdateUserForm?field=image')}>Update Image</button>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>

      <style jsx>{`
        .left-navigation {
          width: 250px;
          background-color: #f4f4f4;
          padding: 20px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          border-right: 1px solid #ddd;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          margin-bottom: 10px;
        }

        button {
          width: 100%;
          padding: 10px;
          border: none;
          background-color: #0070f3;
          color: #fff;
          cursor: pointer;
          border-radius: 5px;
          text-align: left;
          font-size: 16px;
        }

        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default LeftNavigation;
