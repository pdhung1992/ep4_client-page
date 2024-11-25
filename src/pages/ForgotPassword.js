import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {loadScripts} from "../helpers/script-helpers";
import {useDispatch, useSelector} from "react-redux";
import authServices from "../services/auth-services";
import Swal from "sweetalert2";


const ForgotPassword = () => {
    useEffect(() => {
        loadScripts();
    }, []);

    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(false);

    const checkLogin = () => {
        if (user && user.userData) {
            setIsLogin(true);
        }
    }
    if (isLogin) {
        navigate('/');
    }

    useEffect(() => {
        checkLogin();
    },[])

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const onChangeEmail = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputEmail);
        setIsValidEmail(isValid);
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const formData = {
            email
        }
        const res = await authServices.forgotPassword(formData);
        if (res && res.responseCode === 200) {
            Swal.fire({
                title: 'Reset password success!',
                text: `${res.responseMessage}`,
                icon: 'success',
                background: '#1a1a1a',
                color: '#5ba515',
                confirmButtonText: 'Okay!',
                confirmButtonColor: '#5ba515'
            }).then(() => {
                navigate('/sign-in');
            });
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

    return (
        <div>
            <section className="breadcrumb-area auth-breadcrumb-area breadcrumb-bg"
                     data-background="/assets/img/bg/breadcrumb_signin.png">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2 className="title">Forgot password?</h2>
                                <div className="contact-form sign-in-form">
                                    <div className={'col-md-6 offset-3'}>
                                        <form onSubmit={handleForgotPassword}>
                                            <input type="text" placeholder="Enter your email *"
                                                   className={`form-custom-input ${isValidEmail === false ? 'mb-2' : ''}`}
                                                   name={'email'}
                                                   onChange={onChangeEmail}
                                            />
                                            <div className={'form-floating mb-0 mt-0'}>
                                                {!isValidEmail && <p style={{color: '#e4d804'}}>Email is not valid!</p>}
                                            </div>
                                            <button className="btn reset-pwd-btn" type={"submit"}>Send reset password to
                                                my email
                                            </button>
                                        </form>
                                    </div>
                                    <br/>
                                    <div>
                                        <Link
                                            to={'/sign-in'}><strong style={{color: '#fff'}}>Sign in</strong>
                                        </Link>
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

export default ForgotPassword;
