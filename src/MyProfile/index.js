import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { ALL_PROFILE_URL } from '../constant';

function MyProfile(props) {
    const [state, setState] = useState([]);

    useEffect(() => { getProfileDetails(); }, []);

    const getProfileDetails = async () => {
        axios.get('https://reqres.in/api/users/4').then(
            (response) => {
                var result = response.data.data;
                setState([result]);
            },
            (error) => {
                console.log(error);
            }
        );
    }

    return (
        <div className='all-profile-styles'>
            {state && state.map(item =>
                <div key={item.id} className="user-profile">
                    <h4>{item.first_name}</h4>
                    <p>{item.email}</p>
                    <img src={item.avatar} alt="profile" />
                    <div style={{ paddingTop: '10px' }}>
                        <Link to={{ pathname: `${ALL_PROFILE_URL}` }}> All Profiles</Link>
                    </div>
                </div>
            )}
        </div >
    )
}

export default MyProfile;