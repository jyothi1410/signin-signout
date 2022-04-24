import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HOME_URL, LOGIN_URL, REGISTER_URL } from '../constant';
import './style.css';

function Home(props) {
    const navigate = useNavigate();
    const authenticated = JSON.parse(sessionStorage.getItem('isLogged'))

    useEffect(() => { if (!authenticated) navigate(HOME_URL) }, [])
    const Login = async () => { navigate(LOGIN_URL); }
    const Register = async () => { navigate(REGISTER_URL); }

    return (
        <div className='padding10'>
            <div className="btnStyles">
                <input type="submit" value="Login" onClick={Login} className="btn" />
                <input type="submit" value="Register" onClick={Register} className="btn" />
            </div>
        </div>
    )
}

export default Home;