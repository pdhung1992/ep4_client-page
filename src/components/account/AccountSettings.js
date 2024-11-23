import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {loadScripts} from "../../helpers/script-helpers";
import authServices from "../../services/auth-services";
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";


const AccountSettings = () => {
    useEffect(() => {
        loadScripts();
    }, []);
    const user = useSelector(state => state.auth);
    const token = user.userData.token;

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + token,
        },
        credentials: "true",
    }

    const [userInfo, setUserInfo] = useState({});
    const fetchUserInfo = async () => {
        const res = await authServices.getUserInfo(axiosConfig);
        setUserInfo(res);
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value);
        checkPasswordMatch(e.target.value, confirmNewPassword);
    }
    const onChangeConfirmNewPassword = (e) => {
        setConfirmNewPassword(e.target.value);
        checkPasswordMatch(newPassword, e.target.value);
    }
    const checkPasswordMatch = (password, confirm) => {
        setPasswordsMatch(password === confirm);
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordsMatch){
            const formData = {
                password: password,
                newPassword: newPassword
            }
            const res = await authServices.changePassword(formData, axiosConfig);
            console.log(res);
            if (res.responseCode === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: res.responseMessage,
                    background: '#1a1a1a',
                    color: '#5ba515',
                    confirmButtonColor: '#5ba515'
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleClose();
                    }
                });
            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.responseMessage,
                    background: '#1a1a1a',
                    color: '#f27474',
                    confirmButtonColor: '#f27474'
                });
            }
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Passwords do not match',
                background: '#1a1a1a',
                color: '#f27474',
                confirmButtonColor: '#f27474'
            });
        }
    }

    return (
        <div>
            <div className="contact-form-wrap">
                <div className="widget-title mb-50">
                    <h5 className="title">Account Settings</h5>
                </div>
                <div className="contact-form">
                    <h6>User information:</h6>
                    <div className="row pt-2">
                        <div className="col-md-4">
                            <p>Full name</p>
                        </div>
                        <div className="col-md-8">
                            <p style={{color: '#e4d804'}}>{userInfo.fullName}</p>
                        </div>
                    </div>
                    <div className="row pt-2">
                        <div className="col-md-4">
                            <p>Phone</p>
                        </div>
                        <div className="col-md-8">
                            <p style={{color: '#e4d804'}}>{userInfo.phone}</p>
                        </div>
                    </div>
                    <div className="row pt-2">
                        <div className="col-md-4">
                            <p>Email</p>
                        </div>
                        <div className="col-md-8">
                            <p style={{color: '#e4d804'}}>{userInfo.email}</p>
                        </div>
                    </div>
                    <div className="row pt-2">
                        <div className="col-md-4">
                            <p>MovieX member from</p>
                        </div>
                        <div className="col-md-8">
                            <p style={{color: '#e4d804'}}>{userInfo.joinDate}</p>
                        </div>
                    </div>
                    <div className="row pt-2">
                        <div className="col-md-4">
                            <p>Status</p>
                        </div>
                        <div className="col-md-8">
                            <p style={{color: '#e4d804'}}>{userInfo.isActive ? 'Active' : 'Block'}</p>
                        </div>
                    </div>
                    <h6>Actions:</h6>
                    <div className="row pt-2 d-flex justify-content-center align-items-center">
                        <div className="col-md-4">
                            <p>Change password</p>
                        </div>
                        <div className="col-md-8">
                            <button className="btn" onClick={() => setShow(true)}>Change password</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show}
                   onHide={handleClose}
                   centered
            >
                <div className={'row d-flex justify-content-between align-items-center video-modal-header'}>
                    <h5 className={'mx-2'} style={{marginBottom: 0}}>Change password</h5>
                    <button className={'video-modal-close-btn'} onClick={handleClose}><FontAwesomeIcon icon={faXmark}/></button>
                </div>
                <div className={'row change-password-modal contact-form sign-in-form'}>
                    <form onSubmit={handleChangePassword}>
                        <input type="password"
                               placeholder="Password *"
                               className={'form-custom-input'}
                               value={password}
                               onChange={onChangePassword}
                               name={'password'}
                        />
                        <input type="password"
                               placeholder="New Password *"
                               className={'form-custom-input'}
                               value={newPassword}
                               onChange={onChangeNewPassword}
                               name={'newPassword'}
                        />
                        <input type="password"
                               placeholder="Confirm new password *"
                               className={'form-custom-input'}
                               value={confirmNewPassword}
                               onChange={onChangeConfirmNewPassword}
                               name={'confirmNewPassword'}
                        />
                        <div className="text-center">
                            <button className="btn" type={'submit'}>Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AccountSettings;
