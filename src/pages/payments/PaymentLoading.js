import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import paymentServices from "../../services/payment-services";
import {useSelector} from "react-redux";


const PaymentLoading = () => {
    const navigate = useNavigate();

    const user = useSelector(state => state.auth);
    const token = user.userData.token;

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + token,
        },
        credentials: "true",
    }

    useEffect(() => {
        const sendIPN = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const response = await paymentServices.handleIpn(params, axiosConfig);
                if (response && response.responseCode === 200) {
                    navigate("/payment-success");
                } else {
                    console.error("No redirect URL found.");
                    navigate("/payment-fail");
                }
            } catch (error) {
                console.error("Error processing IPN:", error);
                navigate("/payment-fail");
            }
        }
        sendIPN();
    },[navigate]);

    return (
        <div className={'payment-page'}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="message-box _loading _success">
                            <i className="fa fa-spinner" aria-hidden="true"></i>
                            <h2 style={{color: '#e4d804'}}> Your payment is processing...</h2>
                            <p> Please for a moment.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentLoading;
