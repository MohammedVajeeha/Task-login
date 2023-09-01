import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './sign-up.css';
import TermsModal from './terms-conditions-page';
import axios from 'axios';
import { log } from 'console';

interface FormData {
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  designation: string;
  location: string;
  agreeTerms: boolean;
}




const Signup: React.FC = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    employeeId: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    designation: '',
    location: '',
    agreeTerms: false,
  });

  // const navigateToProfile = () => {
  //   navigate('/'); // Redirect to the profile page using React Router's history object
  //   window.location.href = '/';
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const data = {
    agreeTerms: formData.agreeTerms,
    confirmPassword: formData.confirmPassword,
    designation: formData.designation,
    email: formData.email,
    employeeId: formData.employeeId,
    firstName: formData.firstName,
    lastName: formData.lastName,
    location: formData.location,
    password: formData.password,
    phoneNumber: formData.phoneNumber,
  };

  console.log(formData);

 const validateForm = (): boolean => {
  if (
    !formData.firstName ||
    !formData.lastName ||
    !formData.employeeId ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword ||
    !formData.phoneNumber ||
    !formData.designation ||
    !formData.location
  ) {
    alert('Please fill out all fields.');
    return false;
  }

  if (!/^[A-Za-z\s]+$/.test(formData.firstName) || !/^[A-Za-z\s]+$/.test(formData.lastName)) {
    alert('First name and last name should only contain letters and spaces.');
    return false;
  }

  if (!/^\d+$/.test(formData.employeeId)) {
    alert('Please enter a valid employee ID.');
    return false;
  }

  if (!/^[\w-]+(\.[\w-]+)*@jmangroup\.com$/.test(formData.email)) {
    alert('Please enter a valid JMango Group email address.');
    return false;
  }

  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match.');
    return false;
  }

  if (!/^\d{10}$/.test(formData.phoneNumber)) {
    alert('Please enter a valid 10-digit phone number.');
    return false;
  }

  if (!/^[A-Za-z\s]+$/.test(formData.designation)) {
    alert('Please enter a valid designation containing letters and spaces.');
    return false;
  }

  if (formData.location !== 'London' && formData.location !== 'India') {
    alert('Please select a valid location.');
    return false;
  }

  if (!formData.agreeTerms) {
    alert('Please agree to the terms and conditions.');
    return false;
      }

      return true;
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) =>{
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', data);

      if (response.status === 201) {
        alert('User signed up successfully.');

        setFormData({
          firstName: '',
          lastName: '',
          employeeId: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
          designation: '',
          location: '',
          agreeTerms: false,
        });
      
       navigate('/'); // Redirect to the profile page
      } else {
        alert('Failed to sign up.');
      }
    } catch (error) {
      console.error('An error occurred while signing up.', error);
    }
  };
  
  return (
    <div className="signup-container-1"> {/* Updated class name */}
    
      <form className="signup-form-1" onSubmit={handleSubmit}>
        <h2 className="heading-sign-1">Sign Up</h2>
    <div className="input-group1">
      <label>First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="input-group1">
      <label>Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="input-group1">
      <label>Email </label>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="input-group1">
      <label>Employee ID</label>
      <input
        type="text"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleInputChange}
        required
      />
    </div>
    <div className="input-group1">

          <label>Password</label>

          <input

            type="password"

            name="password"

            value={formData.password}

            onChange={handleInputChange}

            required

          />

        </div>

        <div className="input-group1">

          <label>Confirm Password</label>

          <input

            type="password"

            name="confirmPassword"

            value={formData.confirmPassword}

            onChange={handleInputChange}

            required

          />

        </div>

 

 

        <div className="input-group1">

          <label>Phone Number</label>

          <input

            type="tel"

            name="phoneNumber"

            value={formData.phoneNumber}

            onChange={handleInputChange}

            pattern="[0-9]{10}"

            required

          />

        </div>

        <div className="input-group1">

          <label>Designation</label>

          <input

            type="text"

            name="designation"

            value={formData.designation}

            onChange={handleInputChange}

 

            required

          />

        </div>

 

        <div className="input-group1">

          <label>Location

 

            <select

 

              name="location"

 

              value={formData.location}

 

              onChange={handleInputChange}

 

              required>

 

              <option value="">Select Location</option>

 

              <option value="London">London</option>

 

              <option value="India">India</option>

 

            </select>

 

          </label>

 

 

          {/* <label>

                        Profile Picture

                        <input

                                            type="file"

                                  accept="image/*"

                                    name="profilePicture"

                                    onChange={handleProfilePictureChange}/>

                  </label>  */}

        </div>

 

        <label className="checkbox-label">

          <input

            type="checkbox"

            name="agreeTerms"

            checked={formData.agreeTerms}

            onChange={handleCheckboxChange}

            required

          />

          I agree to the <span onClick={toggleTermsModal}>Terms and Conditions</span>

        </label>

 

        <div className="button-container">

          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <Link to="/">Login here</Link>.
          </p>
        </div>

      </form>

      

      {showTermsModal && <TermsModal onClose={toggleTermsModal} />}
      <div className="RightSection-1">

          <img src={'minipro-img.png'}  alt='pim'/>

      </div>

    </div>

  );

};

 
  
export default Signup;
