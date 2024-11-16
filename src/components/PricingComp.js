import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import paymentServices from "../services/payment-services";
import {updateCurrentPage} from "../actions/page-actions";
import {useLocation, useNavigate} from "react-router-dom";
import packageServices from "../services/package-services";


const PricingComp = () => {
    const location = useLocation();
    const path = location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth);
    const isLoggedIn = user.isLoggedIn;
    const [token, setToken] = useState(null);
    useEffect(() => {
        if (user.userData !== null) {
            setToken(user.userData.token);
        }
    }, [user.userData, token]);

    const axiosConfig = {
        headers: {
            Authorization: "Bearer " + token,
        },
        credentials: "true",
    }

    const [packages, setPackages] = useState([]);
    const fetchPackages = async () => {
        const res = await packageServices.getPackagesForPayment()
        if (res && res.length > 0) {
            setPackages(res);
        }
    }

    useEffect(() => {
        fetchPackages();
    }, []);

    const handlePurchasePackage = async (pkg) => {
        if (!isLoggedIn) {
            dispatch(updateCurrentPage('/pricing'));
            navigate('/sign-in');
        }
        const formData = {
            packageId: pkg.id,
            amount: pkg.price,
            locale: "vn",
            isPackage: true,
        }

        const res = await paymentServices.createPayment(formData, axiosConfig);
        if (res && res.url){
            dispatch(updateCurrentPage(path));
            setTimeout(() => {
                window.location.href = res.url;
            }, 100);
        }
    }

    return (
        <div>
            {/*pricing-area*/}
            <section className="pricing-area pricing-bg" data-background="/assets/img/bg/pricing_bg.jpg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="section-title title-style-three text-center mb-30">
                                <span className="sub-title">our pricing plans</span>
                                <h2 className="title">Our Pricing Strategy</h2>
                            </div>
                        </div>
                    </div>
                    <div className="pricing-box-wrap">
                        <div className="row justify-content-center">
                            {Array.isArray(packages) && packages.length > 0 ? packages.map((pkg, index) => (
                                <div className="col-lg-4 col-md-6 col-sm-8" key={index}>
                                    <div className="pricing-box-item mb-30">
                                        <div className="pricing-top">
                                            <h6>{pkg.name}</h6>
                                            <div className="price">
                                                <h3>${pkg.price}</h3>
                                                <span>Monthly</span>
                                            </div>
                                        </div>
                                        <div className="pricing-list">
                                            <ul>
                                                <li className={'quality'}><i className="fas fa-check"></i> Movies you can
                                                    watch <span>Features</span></li>
                                                <li className="quality"><i className="fas fa-check"></i> Video
                                                    quality <span>Good</span></li>
                                                <li className={'quality'}><i className="fas fa-check"></i> Resolution <span>FHD</span></li>
                                                <li className={'quality'}><i className="fas fa-check"></i> Cancel anytime</li>
                                            </ul>
                                        </div>
                                        <div className="pricing-btn" onClick={() => handlePurchasePackage(pkg)}>
                                            <a href="#" className="btn">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            )) : []}
                        </div>
                    </div>
                </div>
            </section>
            {/*pricing-area-end*/}
        </div>
    )
}

export default PricingComp;
