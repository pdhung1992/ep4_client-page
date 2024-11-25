import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadScripts} from "../helpers/script-helpers";
import {useDispatch, useSelector} from "react-redux";
import Swal from "sweetalert2";
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
    const [isValidFullName, setIsValidFullName] = useState(true);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [phone, setPhone] = useState('');
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const onChangeFullName = (e) => {
        const inputName = e.target.value;
        setFullName(inputName);
        const isValid = inputName.length >= 6;
        setIsValidFullName(isValid);
    }

    const onChangeEmail = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputEmail);
        setIsValidEmail(isValid);
    }

    const onChangePhone = (e) => {
        const inputPhone = e.target.value;
        setPhone(inputPhone);
        const phoneRegex = /^\d{10}$/;
        const isValid = phoneRegex.test(inputPhone);
        setIsValidPhone(isValid);
    }

    const onChangePassword = (e) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);
        checkPasswordMatch(inputPassword, confirmPassword);
        const isValid = inputPassword.length >= 6;
        setIsValidPassword(isValid);
    }

    const onChangeConfirmPassword = (e) => {
        const inputPasswordCfm = e.target.value;
        setConfirmPassword(inputPasswordCfm);
        checkPasswordMatch(password, inputPasswordCfm);
        const isValid = inputPasswordCfm.length >= 6;
        setIsValidConfirmPassword(isValid);
    }

    const checkPasswordMatch = (password, confirm) => {
        setPasswordsMatch(password === confirm);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = {fullName, email, phone, password};

        if(passwordsMatch && isValidFullName && isValidEmail && isValidPhone && isValidPassword && isValidConfirmPassword && fullName !== '' && email !== '' && phone !== '' && password !== ''){
            const response = await authServices.register(formData);
            if(response.responseCode === 201){
                setMessage("Register successfully!");
                Swal.fire({
                    title: 'Register Successfully!',
                    text: 'Now you can Login with new Account!',
                    icon: 'success',
                    background: '#1a1a1a',
                    color: '#5ba515',
                    confirmButtonText: 'Login now!',
                    confirmButtonColor: '#5ba515'
                });
                navigate("/sign-in");
            } else {
                Swal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: 'An error occurred. Please try again!',
                    background: '#1a1a1a',
                    color: '#f27474',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#f27474'
                }) ;
            }
        }
        else {
            if (passwordsMatch === false) {
                Swal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: 'Passwords do not match.',
                    background: '#1a1a1a',
                    color: '#f27474',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#f27474'
                });
            } else {
                Swal.fire({
                    title: 'Oops!',
                    icon: 'error',
                    text: 'Fill all the fields correctly and try again.',
                    background: '#1a1a1a',
                    color: '#f27474',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#f27474'
                });
            }
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
                                                   className={`form-custom-input ${isValidFullName === false ? 'mb-2' : ''}`}
                                                   value={fullName}
                                                   onChange={onChangeFullName}
                                                   name={'fullName'}
                                            />
                                            <div className={'form-floating mb-0 mt-0 text-right'}>
                                                {!isValidFullName && <p style={{color: '#e4d804'}}>Name must more than 6 characters.</p>}
                                            </div>
                                            <input type="text"
                                                   placeholder="Email *"
                                                   className={`form-custom-input ${isValidEmail === false ? 'mb-2' : ''}`}
                                                   value={email}
                                                   onChange={onChangeEmail}
                                                   name={'email'}
                                            />
                                            <div className={'form-floating mb-0 mt-0 text-right'}>
                                                {!isValidEmail && <p style={{color: '#e4d804'}}>Email is not valid.</p>}
                                            </div>
                                            <input type="text"
                                                   placeholder="Telephone number *"
                                                   className={`form-custom-input ${isValidPhone === false ? 'mb-2' : ''}`}
                                                   value={phone}
                                                   onChange={onChangePhone}
                                                   name={'phone'}
                                            />
                                            <div className={'form-floating mb-0 mt-0 text-right'}>
                                                {!isValidPhone &&
                                                    <p style={{color: '#e4d804'}}>Phone must be 10 digits.</p>}
                                            </div>
                                            <input type="password"
                                                   placeholder="Password *"
                                                   className={`form-custom-input ${isValidPassword === false ? 'mb-2' : ''}`}
                                                   value={password}
                                                   onChange={onChangePassword}
                                                   name={'password'}
                                            />
                                            <div className={'form-floating mb-0 mt-0 text-right'}>
                                                {!isValidPassword &&
                                                    <p style={{color: '#e4d804'}}>Password must more than 6
                                                        characters.</p>}
                                            </div>
                                            <input type="password"
                                                   placeholder="Confirm password *"
                                                   className={`form-custom-input ${isValidConfirmPassword === false ? 'mb-2' : ''}`}
                                                   value={confirmPassword}
                                                   onChange={onChangeConfirmPassword}
                                                   name={'confirmPassword'}
                                            />
                                            <div className={'form-floating mb-0 mt-0 text-right'}>
                                                {!isValidConfirmPassword &&
                                                    <p style={{color: '#e4d804'}}>Password must more than 6
                                                        characters.</p>}
                                            </div>
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
