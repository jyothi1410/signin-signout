import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { HOME_URL } from '../constant';

function AllProfiles(props) {
  const [state, setState] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { getProfileDetails(); }, []);

  const getProfileDetails = async () => {
    axios.get('https://reqres.in/api/users?page=1').then(
      (response) => {
        var result = response.data.data;
        setState(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  const Logout = async () => {
    navigate(HOME_URL);
    sessionStorage.clear();
  }

  return (
    <div className='logoutBtn'>
      <input type="submit" value="Log out" onClick={Logout} className="btn" />
      <div className='all-profile-styles'>
        {state && state.map(item =>
          <div key={item.id} className="user-profile">
            <h4>{item.first_name}</h4>
            <p>{item.email}</p>
            <img src={item.avatar} alt="profile" />
          </div>
        )}
      </div>
    </div>
  )
}

export default AllProfiles;