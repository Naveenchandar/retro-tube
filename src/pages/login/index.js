import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import './index.css';
import { loginUser, updateUser } from 'features/authSlice';
import { notification } from '../../utils';

export function Login() {
  const [info, setUserInfo] = useState({
    email: '', password: ''
  });
  const [errorInfo, setErrorInfo] = useState({
    email: '', password: '', error: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const { user, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "";

  useEffect(() => {
    if (error) {
      setErrorInfo({ error })
    }
  }, [error])

  useDocumentTitle('Retro Cart | Login');

  useEffect(() => {
    return () => {
      setUserInfo({ email: '', password: '' });
      setErrorInfo({ email: '', password: '', error: '' });
      setShowPassword(false);
    }
  }, [])


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
        await dispatch(loginUser(info));
      }
    } catch (error) {
      setErrorInfo({ error: error?.response?.data?.error || error?.message });
    }
  }

  const handleTestLogin = () => {
    setUserInfo({
      email: "naveenchandar@gmail.com",
      password: "naveenchandar",
      username: "naveenram"
    });
    dispatch(updateUser({
      email: "naveenchandar@gmail.com",
      password: "naveenchandar",
      firstName: "Naveen",
      lastName: "Ram"
    }));
    navigate(from ? from : '/', { replace: true });
    notification('success', 'Welcome naveen');
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
                disabled={loading && true}
              >{loading ? 'Loading...' : 'Login'}</button>
              <p className="login_new_acc text_center m-1"><Link to='/signup'>Create New Account </Link></p>
            </div>
          </div>
        </form>
      </section>
    )
  }
  return <Navigate to='/' replace />
}