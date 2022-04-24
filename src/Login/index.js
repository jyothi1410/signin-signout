import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROFILE_URL } from '../constant';
import './style.css';

function Login(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    errors: {},
  });
  const navigate = useNavigate();
  const { email, password, errors } = state;

  const handleSubmit = async () => {
    let errors = {};
    if (email === "" || email === undefined) errors.email = "Please enter email";
    if (password === "" || password === undefined || password === null) errors.password = "Please enter password";
    setState(state => ({ ...state, errors }));
    if (Object.keys(errors).length === 0) {
      try {
        var body = { email, password }
        axios.post('https://reqres.in/api/login', body).then(
          (response) => {
            if (response.status === 200) {
              if (response.data.token) {
                sessionStorage.setItem('isLogged', true);
                navigate(PROFILE_URL);
              } else setState(state => ({ ...state, errors: { ...errors, errMsg: 'Invalid User' } }));
            }
          },
          (error) => { setState(state => ({ ...state, errors: { ...errors, errMsg: 'Invalid User' } })); });
      } catch (ex) {
        setState(state => ({ ...state, errors: { ...errors, errMsg: ex } }));
      }
    }
  }
  const handleValueChange = (info, e) => {
    if (e !== "") errors[info] = "";
    setState(state => ({ ...state, [info]: e.target.value }));
    if (info === "email") {
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!e.target.value.match(validRegex)) setState(state => ({ ...state, errors: { ...errors, [info]: 'Please enter a valid email' } }));
    }
  }

  //email:eve.holt@reqres.in
  // password:cityslicka

  return (
    <div className='padding10'>
      <div className="login-styles">
        <h1>Login</h1>
        <div className="form-styles">
          <ul className='custom-list-inline'>
            <li>
              <h4 className='form-label'>Email : </h4>
              <input type="text" value={email} onChange={(e) => handleValueChange('email', e)} />
              <p className='errMsg'>{errors.email}</p>
            </li>
            <li>
              <h4 className='form-label'>Password : </h4>
              <input type="password" value={password} onChange={(e) => handleValueChange('password', e)} />
              <p className='errMsg'>{errors.password}</p>
            </li>
            <li className='submitBtn'>
              <input type="submit" value="Submit" onClick={handleSubmit} />
            </li>
            <p className='errMsg'>{errors.errMsg}</p>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login;