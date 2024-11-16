import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadScripts} from "../helpers/script-helpers";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
import * as authService from "swiper/element";
import authServices from "../services/auth-services";


const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const user = useSelector(state => state.auth);
    const [isLogin, setIsLogin] = useState(false);

    const checkLogin = () => {
        if (user && user.userData){
            setIsLogin(true);
        }
    }

    if (isLogin){
        navigate('/');
    }

    useEffect(() => {
        loadScripts();
        checkLogin();
    }, []);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const onChangeFullName = (e) => {
        setFullName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        checkPasswordMatch(e.target.value, confirmPassword);
    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        checkPasswordMatch(password, e.target.value);
    }

    const checkPasswordMatch = (password, confirm) => {
        setPasswordsMatch(password === confirm);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = {fullName, email, phone, password};

        if(passwordsMatch){
            const response = await authServices.register(formData);
            console.log(response);
            if(response.responseCode === 201){
                setMessage("Register successfully!");
                Swal.fire({
                    title: 'Register Successfully!',
                    text: 'Now you can Login with new Account!',
                    icon: 'success',
                    confirmButtonText: 'Login now!',
                    confirmButtonColor: '#5ba515'
                });
                navigate("/sign-in");
            } else {
                Swal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: 'An error occurred. Please try again!',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#f27474'
                }) ;
            }
        }
        else {
            setMessage("Password do not match!")
        }
    }


    return (
        <div>
            <section className="breadcrumb-area auth-breadcrumb-area breadcrumb-bg auth-breadcrumb-bg"
                     data-background="/assets/img/bg/breadcrumb_signin.png">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-content breadcrumb-auth-content">
                                <h2 className="title">Sign up</h2>
                                <div className="contact-form sign-in-form">
                                    <div className={'col-md-6 offset-3'}>
                                        <form onSubmit={handleRegister}>
                                            <input type="text"
                                                   placeholder="Full name *"
                                                   className={'form-custom-input'}
                                                   value={fullName}
                                                   onChange={onChangeFullName}
                                                   name={'fullName'}
                                            />
                                            <input type="text"
                                                   placeholder="Email *"
                                                   className={'form-custom-input'}
                                                   value={email}
                                                   onChange={onChangeEmail}
                                                   name={'email'}
                                            />
                                            <input type="text"
                                                   placeholder="Telephone number *"
                                                   className={'form-custom-input'}
                                                   value={phone}
                                                   onChange={onChangePhone}
                                                   name={'phone'}
                                            />
                                            <input type="password"
                                                   placeholder="Password *"
                                                   className={'form-custom-input'}
                                                   value={password}
                                                   onChange={onChangePassword}
                                                   name={'password'}
                                            />
                                            <input type="password"
                                                   placeholder="Confirm password *"
                                                   className={'form-custom-input'}
                                                   value={confirmPassword}
                                                   onChange={onChangeConfirmPassword}
                                                   name={'confirmPassword'}
                                            />
                                            <button className="btn" type={'submit'}>Sign up</button>
                                        </form>
                                    </div>
                                    <br/>
                                    <div>
                                        <p style={{color: '#e4d804'}}>Already have an account? <Link
                                            to={'/sign-in'}><strong style={{color: '#fff'}}>Sign in</strong></Link></p>
                                    </div>
                                    <div>
                                        <p style={{color: '#e4d804'}}>Back to <Link to={'/'}><strong
                                            style={{color: '#fff'}}>Home</strong></Link></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignUp;
