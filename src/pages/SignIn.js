import {useEffect, useState} from "react";
import {loadScripts} from "../helpers/script-helpers";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginFail, loginSuccess} from "../actions/auth-actions";
import authServices from "../services/auth-services";


const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [path, setPath] = useState('/');
    const page = useSelector(state => state.page);
    useEffect(() => {
        if (page && page.currentPage) {
            setPath(page.currentPage);
        }
    }, [page.currentPage]);

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

    const [phoneOrEmail, setPhoneOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUsername = (e) => {
        setPhoneOrEmail(e.target.value);
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                phoneOrEmail, password
            };
            const data = await authServices.login(formData);
            if (data && data.token) {
                dispatch(loginSuccess(data));
                if (path !== '/'){
                    navigate(path);
                }else {
                    navigate(-1);
                }
            } else {
                dispatch(loginFail('Login failed.'));
            }
        } catch (error) {
            const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            setMessage(resMessage);
        }
    }

    return (
        <div>
            <section className="breadcrumb-area auth-breadcrumb-area breadcrumb-bg" data-background="/assets/img/bg/breadcrumb_signin.png">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <h2 className="title">Sign in</h2>
                                <div className="contact-form sign-in-form">
                                    <div className={'col-md-6 offset-3'}>
                                        <form onSubmit={handleLogin}>
                                            <input type="text"
                                                   placeholder="Email or Telephone *"
                                                   className={'form-custom-input'}
                                                   name={'phoneOrEmail'}
                                                    value={phoneOrEmail}
                                                    onChange={handleChangeUsername}
                                            />
                                            <input type="password"
                                                   placeholder="Password *"
                                                   className={'form-custom-input'}
                                                    name={'password'}
                                                     value={password}
                                                     onChange={handleChangePassword}
                                            />
                                            <div className={'text-right mb-3'}>
                                                <Link to={'/forgot-password'}><span style={{color: '#fff'}}>Forgot Password?</span></Link>
                                            </div>
                                            <button className="btn" type={'submit'}>Sign in</button>
                                        </form>
                                    </div>
                                    <br/>
                                    <div>
                                        <p style={{color: '#e4d804'}}>Don't have an account? <Link to={'/sign-up'}><strong style={{color: '#fff'}}>Sign up</strong></Link></p>
                                    </div>
                                    <div>
                                        <p style={{color: '#e4d804'}}>Back to <Link to={'/'}><strong style={{color: '#fff'}}>Home</strong></Link></p>
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

export default SignIn;
