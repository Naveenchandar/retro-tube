import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useDocumentTitle } from 'hooks/useDocumentTitle';
import { handleValidation } from 'utils';
import { signupUser } from 'features/authSlice';

export function SignUp() {
    const [info, setUserInfo] = useState({
        email: '', password: '', firstName: '', lastName: '', confirmPwd: ''
    });
    const [errorInfo, setErrorInfo] = useState({
        email: '', password: '', firstName: '', lastName: '', confirmPwd: ''
    });

    const [showPassword, setShowPassword] = useState({ pwd: false, confirmPwd: false });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { signUpError, signUpLoading } = useSelector(state => state.user);

    useDocumentTitle('Retro-tube | Sign up');

    const togglePassword = (type) => {
        if (type === 'pwd') {
            setShowPassword({ ...showPassword, pwd: !showPassword.pwd });
        } else {
            setShowPassword({ ...showPassword, confirmPwd: !showPassword.confirmPwd });
        }
    }

    const handleInputChange = (targetValue, type) => {
        setErrorInfo({ email: '', password: '', firstName: '', lastName: '', confirmPwd: '' });
        setUserInfo({ ...info, [type]: targetValue });
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const response = handleValidation(info, errorInfo)
            if (response?.valid) {
                const { payload: { error } } = await dispatch(signupUser(info));
                if (!error) {
                    navigate('/login');
                }
            } else {
                setErrorInfo(response);
            }
        } catch (error) {
            setErrorInfo({ error: error?.response?.data?.errors?.[0] || error?.message || error || 'Something went wrong, Please try again.'});
        }
    }

    return (
        <section id="login">
            <form onSubmit={handleSignup}>
                <div className="flex flex_column h_screen_100">
                    <div className="login_body border px-4 py-2">
                        <div className="login_header">
                            <h4 className="py-2 font_bold text_center">Signup</h4>
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
                                    required
                                />
                            </div>
                            {errorInfo.email && <p className='input_errormsg'>{errorInfo.email}</p>}
                        </div>
                        <div className="login_password py-1">
                            <div className="input_group flex align_start flex_dcolumn">
                                <label>First name</label>
                                <input
                                    type="text"
                                    placeholder="first name"
                                    className="input w-100"
                                    onChange={(e) => handleInputChange(e.target.value, 'firstName')}
                                    value={info?.firstName}
                                    required
                                />
                            </div>
                            {errorInfo.firstName && <p className='input_errormsg'>{errorInfo.firstName}</p>}
                        </div>
                        <div className="login_password py-1">
                            <div className="input_group flex align_start flex_dcolumn">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    placeholder="last name"
                                    className="input w-100"
                                    onChange={(e) => handleInputChange(e.target.value, 'lastName')}
                                    value={info?.lastName}
                                    required
                                />
                            </div>
                            {errorInfo.lastName && <p className='input_errormsg'>{errorInfo.lastName}</p>}
                        </div>
                        <div className="login_password py-1">
                            <div className="input_group flex align_start flex_dcolumn">
                                <label>Password</label>
                                <div className="input_password">
                                    <span>
                                        <input
                                            type={showPassword.pwd ? "text" : "password"}
                                            placeholder="**********"
                                            className="input"
                                            onChange={(e) => handleInputChange(e.target.value, 'password')}
                                            value={info?.password}
                                            required
                                        />
                                        <i className={showPassword.pwd ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => togglePassword('pwd')}></i>
                                    </span>
                                </div>
                            </div>
                            {errorInfo.password && <p className='input_errormsg'>{errorInfo.password}</p>}
                        </div>
                        <div className="login_password py-1">
                            <div className="input_group flex align_start flex_dcolumn">
                                <label>Confirm Password</label>
                                <div className="input_password">
                                    <span>
                                        <input
                                            type={showPassword.confirmPwd ? "text" : "password"}
                                            placeholder="**********"
                                            className="input"
                                            onChange={(e) => handleInputChange(e.target.value, 'confirmPwd')}
                                            value={info?.confirmPwd}
                                            required
                                        />
                                        <i className={showPassword.confirmPwd ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => togglePassword('cpwd')}></i>
                                    </span>
                                </div>
                            </div>
                            {errorInfo.confirmPwd && <p className='input_errormsg py-1'>{errorInfo.confirmPwd}</p>}
                        </div>
                        {(errorInfo.error || signUpError) && <p className='input_errormsg py-1'>{errorInfo.error || signUpError}</p>}
                        <button
                            className="login_btn btn btn_primary w-100"
                            disabled={signUpLoading && true}
                        >
                            {signUpLoading ? 'Loading' : 'Sign up'}
                        </button>
                        <p className="login_new_acc text_center m-1"><Link to='/login'>Login </Link></p>
                    </div>
                </div>
            </form>
        </section>
    )
}