'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateName } from '@/app/store/authSlice';
import styles from '../../page.module.css';

const UpdateUserForm = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [number, setNumber] = useState<number | ''>('');
  const [password, setPassword] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const selectUserInfo = (state: any) => state?.user;
  const userData = useSelector(selectUserInfo);
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = userData.email;
  const field = searchParams.get('field');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      setPreviewUrl(`http://localhost:5000/uploads/${userData.profilePicture}`);
    }
  }, [userData]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setMessage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(
        `http://localhost:5000/upload/${email}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Profile picture uploaded successfully');
        setPreviewUrl(`http://localhost:5000/uploads/${response.data.profilePicture}`);
      } else {
        setMessage('Failed to upload image');
      }
    } catch (error) {
      setMessage('Error uploading file');
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const data: any = {};
      if (field === 'name') data.name = firstName;
      if (field === 'number') data.number = number;
      if (field === 'password') data.password = password;

      const valueForUpdate = { email, data };
      const response = await dispatch(updateName(valueForUpdate)).unwrap();

      if (response?.data?.code === 200) {
        setMessage('User information updated successfully');
        router.push('/profile');
      } else {
        setMessage('Failed to update user');
      }
    } catch (error) {
      setMessage('Error updating user');
      console.error(error);
    }
  };

  return (
    <div className="update-user-form">
      <h2>Update User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        {field === 'name' && (
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        )}
        {field === 'number' && (
          <div className="form-group">
            <label htmlFor="number">Number</label>
            <input
              type="number"
              id="number"
              value={number}
              onChange={(e) => setNumber(parseInt(e.target.value) || '')}
            />
          </div>
        )}
        {field === 'password' && (
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}
        {field != "image" && (
            <button type="submit">Update</button>
        )}
      </form>
      <div className="file-upload-container">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleImageUpload}>Upload Profile Picture</button>
        {message && <p>{message}</p>}
      </div>
      <style jsx>{`
        .update-user-form {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          background-color: #fff;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
        }
        input {
          width: 100%;
          padding: 8px;
          box-sizing: border-box;
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        .file-upload-container {
          margin-top: 20px;
        }
        .image-preview {
          margin-top: 10px;
        }
        .profile-image {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default UpdateUserForm;
