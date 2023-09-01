




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile-page.css';

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  phoneNumber: string;
  designation: string;
  location: string;
}


const ProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [editableFields, setEditableFields] = useState({
    phoneNumber: '',
    designation: '',
    location: '',
  });
  const [userEmail, setUserEmail] = useState('');

  console.log(userProfile);



  useEffect(() => {
    fetchUserProfile("mohd@jmangroup.com");
  }, [userEmail]);



  const fetchUserProfile = async (email: string) => {
    try {
      // console.log('Fetching user profile for email:', email);
      const userData = localStorage.getItem("user")
      let e = userData
      const response = await axios.get(`http://localhost:5000/profile/${e}`);
      console.log('Fetched user profile response:', response.data);
      setUserProfile(response.data.user);
      setEditableFields({
        ...response.data,
        phoneNumber: '',
        designation: '',
        location: '',
        additionalField1: '',
        additionalField2: '',
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };


  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //   const { name, value } = event.target;
  //   setEditableFields((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const handleUpdateProfile = async () => {
  //   try {
  //     const response = await axios.put('http://localhost:5000/updateProfile', editableFields);
  //     if (response.status === 200) {
  //       console.log('Profile updated successfully.');
  //       // Fetch updated profile after successful update
  //       fetchUserProfile(userEmail);
  //     }
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //   }
  // };

  return (

    <div className="profile-container">
      {userProfile ? (
        <div className="profile-details">
          <h2>Welcome, {userProfile.firstName}!</h2>
          <p><b>Employee ID: </b>{userProfile.employeeId}</p>
          <p><b>Email:</b> {userProfile.email}</p>
          <p><b>Phone Number:</b> {userProfile.phoneNumber}</p>
          <p><b>Designation: </b>{userProfile.designation}</p>
          <p><b>Location:</b> {userProfile.location}</p>

        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
      {/* 
      {userProfile && (
        <div className="profile-edit">
          <h3>Edit Profile</h3>
          <div className="input-group2">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={editableFields.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group2">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={editableFields.designation}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group2">
            <label>Location</label>
            <select name="location" value={editableFields.location} onChange={handleInputChange}>
              <option value="">Select Location</option>
              <option value="London">London</option>
              <option value="India">India</option>
            </select>
          </div>
          <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      )} */}
    </div>
  );
};

export default ProfilePage;
