import axios from 'axios';
import { useState } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useAuth } from '../../context/auth';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import './index.css';

export function Login() {
  const [info, setUserInfo] = useState({
    email: '', password: ''
  });
  const [errorInfo, setErrorInfo] = useState({
    email: '', password: '', error: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const { user, updateUser } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "";

  useDocumentTitle('Retro Cart | Login');


  const handleInputChange = (targetValue, type) => {
    if (type === 'email') {
      setErrorInfo({ ...errorInfo, email: '', error: '' });
    }
    if (type === 'password') {
      setErrorInfo({ ...errorInfo, password: '', error: '' });
    }
    setUserInfo({ ...info, [type]: targetValue });
  }

  const handleValidation = () => {
    const { email, password } = info;
    if (!email && !password) {
      setErrorInfo({ ...errorInfo, email: 'Please enter email id', password: 'Please enter password' });
      return false;
    }
    if (!email) {
      setErrorInfo({ ...errorInfo, email: 'Please enter email id', error: '' });
      return false;
    }
    if (!password) {
      setErrorInfo({ ...errorInfo, password: 'Please enter password', error: '' });
      return false;
    }
    return true;
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        const { status, data: { encodedToken } } = await axios.post("/api/auth/login", info)
        if (status === 200 && encodedToken) {
          updateUser(jwt_decode(encodedToken));
          localStorage.setItem("retro-tube-token", encodedToken);
          navigate(from, { replace: true });
        } else {
          throw new Error('Email or Password is incorrect');
        }
      }
    } catch (error) {
      setErrorInfo({ error: 'Email or Password is incorrect' });
    }
  }

  const handleTestLogin = () => {
    setUserInfo({
      email: "naveenchandar@gmail.com",
      password: "naveenchandar",
    });
    updateUser({
      email: "naveenchandar@gmail.com",
      password: "naveenchandar",
    })
    navigate('/');
  }

  const togglePassword = () => setShowPassword((showPassword) => !showPassword);


  if (!user?.email) {
    return (
      <section id="login">
        <form onSubmit={handleLogin}>
          <div className="flex flex_column h_screen_100">
            <div className="login_body border px-4 py-2">
              <div className="login_header">
                <h4 className="py-2 font_bold text_center">Login</h4>
              </div>
              <div className="login_email py-1">
                <div className="input_group flex align_start flex_dcolumn">
                  <label>Email address</label>
                  <input
                    type="text"
                    placeholder="abc@gmail.com"
                    className="input w-100"
                    onChange={(e) => handleInputChange(e.target.value, 'email')}
                    value={info?.email}
                  />
                  {errorInfo?.email && (
                    <p className='input_errormsg'>{errorInfo.email}</p>
                  )}
                </div>
              </div>
              <div className="login_password py-1">
                <div className="input_group flex align_start flex_dcolumn">
                  <label>Password</label>
                  <div className="input_password">
                    <span>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="**********"
                        className="input"
                        onChange={(e) => handleInputChange(e.target.value, 'password')}
                        value={info?.password}
                      />
                      <i className={showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={togglePassword}></i>
                    </span>
                  </div>
                  {errorInfo?.password && (
                    <p className='input_errormsg'>{errorInfo.password}</p>
                  )}
                </div>
              </div>
              {errorInfo?.error && (
                <p className='input_errormsg'>{errorInfo.error}</p>
              )}
              <button
                onClick={handleTestLogin}
                className="login_btn btn btn_primary w-100"
              >
                Test login
              </button>
              <button
                className="login_btn btn btn_primary w-100"
              >Login</button>
              <p className="login_new_acc text_center m-1"><Link to='/signup'>Create New Account </Link></p>
            </div>
          </div>
        </form>
      </section>
    )
  }
  return <Navigate to='/' replace />
}