import {Link} from "react-router-dom";


const PaymentFail = () => {
    return (
        <div className={'payment-page'}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="message-box _success _failed">
                            <i className="fa fa-times-circle" aria-hidden="true"></i>
                            <h2 style={{color: '#d31819'}}> Your payment failed!</h2>
                            <p> Try again later.</p>
                            <br/>
                            <Link to={'/'} className="btn _failed-btn">Continue</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentFail;
