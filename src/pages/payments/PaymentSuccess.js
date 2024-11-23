import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


const PaymentSuccess = () => {
    const [path, setPath] = useState('/');
    const page = useSelector(state => state.page);
    useEffect(() => {
        if (page && page.currentPage) {
            setPath(page.currentPage);
        }
    }, [page.currentPage]);

    const navigate = useNavigate();

    const successNavigate = () => {
        navigate(path);
    }

    return (
        <div className={'payment-page'}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="message-box _success" style={{background: '#1a1a1a'}}>
                            <i className="fa fa-check-circle" aria-hidden="true"></i>
                            <h2 style={{color: '#29A744'}}>Your payment was successful!</h2>
                            <p> Thank you for your payment.</p>
                            <br/>
                            <button className="btn _success-btn" onClick={successNavigate}>Enjoy watching</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
