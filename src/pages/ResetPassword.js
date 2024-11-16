import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {loadScripts} from "../helpers/script-helpers";
import {useDispatch, useSelector} from "react-redux";
import authServices from "../services/auth-services";
import Swal from "sweetalert2";


const ResetPassword = () => {
    useEffect(() => {
        loadScripts();
    }, []);

    const user = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [token, setToken] = useState('');

    const location = useLocation();

    useEffect(() => {
        const token = location.search.split('=')[1];
        setToken(token);
    },[]);

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

    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCfm, setNewPasswordCfm] = useState('');
    const [inputError, setInputError] = useState('');
    const [responseType, setResponseType] = useState('');

    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
    }
    const onChangeNewPasswordCfm = (e) => {
        setNewPasswordCfm(e.target.value);
    }

    const isPasswordMatch = () => {
        return newPassword === newPasswordCfm;
    }

    useEffect(() => {
        if (!isPasswordMatch()) {
            setInputError('New passwords do not match');
        } else {
            setInputError('');
        }
    }, [newPasswordCfm]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (isPasswordMatch()) {
            const formData = {
                newPassword,
                token
            }
            const res = await authServices.resetPassword(formData);
            if (res && res.responseCode === 200) {
                Swal.fire({
                    title: 'Reset password success!',
                    text: `${res.responseMessage}`,
                    icon: 'success',
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
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#f27474'
                }) ;
            }
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
                                <h2 className="title">Reset password</h2>
                                <div className="contact-form sign-in-form">
                                    <div className={'col-md-6 offset-3'}>
                                        <form onSubmit={handleResetPassword}>
                                            <input type="password"
                                                   placeholder="Ennter new password *"
                                                   className={'form-custom-input'}
                                                    name={'newPassword'}
                                                    onChange={onChangeNewPassword}
                                            />
                                            <input type="password"
                                                   placeholder="Confirm new password *"
                                                   className={'form-custom-input'}
                                                    name={'newPasswordCfm'}
                                                    onChange={onChangeNewPasswordCfm}
                                            />
                                            <button type={"submit"} className="btn">Reset password</button>
                                        </form>
                                    </div>
                                    <br/>
                                    <div>
                                        <Link to={'/sign-in'}><strong style={{color: '#fff'}}>Sign in</strong></Link>
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

export default ResetPassword;
