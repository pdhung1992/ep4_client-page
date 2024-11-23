import {useEffect} from "react";
import {loadScripts} from "../helpers/script-helpers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBoxesPacking, faClapperboard, faGear, faWallet} from "@fortawesome/free-solid-svg-icons";
import {Link, Route, Routes} from "react-router-dom";
import AccountSettings from "../components/account/AccountSettings";
import UserMovies from "../components/account/UserMovies";
import UserPackages from "../components/account/UserPackages";
import TransactionHistory from "../components/account/TransactionHistory";

const Account = () => {
    useEffect(() => {
        loadScripts();
    }, []);
    return (
        <div>
            {/*Scroll-top*/}
            <button className="scroll-top scroll-to-target" data-target="html">
                <i className="fas fa-angle-up"></i>
            </button>
            {/*Scroll-top-end*/}

            <main>
                {/*breadcrumb-area*/}
                <section className="breadcrumb-area breadcrumb-bg" data-background="/assets/img/bg/breadcrumb_bg.png">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-content">
                                    <h2 className="title">Your Account</h2>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Account</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*breadcrumb-area-end*/}

                {/*contact-area*/}
                <section className="contact-area contact-bg" data-background="/assets/img/bg/contact_bg.jpg">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="contact-info-wrap">
                                    <div className="contact-info-list">
                                        <ul>
                                            <li>
                                                <div className="icon"><FontAwesomeIcon icon={faGear}/></div>
                                                <h5><Link to={'settings'}>Account Settings </Link></h5>
                                            </li>
                                            <li>
                                                <div className="icon"><FontAwesomeIcon icon={faClapperboard}/></div>
                                                <h5><Link to={'movies'}>My Movies</Link></h5>
                                            </li>
                                            <li>
                                                <div className="icon"><FontAwesomeIcon icon={faBoxesPacking}/></div>
                                                <h5><Link to={'packages'}>My Packages</Link></h5>
                                            </li>
                                            <li>
                                                <div className="icon"><FontAwesomeIcon icon={faWallet}/></div>
                                                <h5><Link to={'transactions'}>Transaction history</Link></h5>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <Routes>
                                    <Route path={'/settings'} element={<AccountSettings/>}/>
                                    <Route path={'/movies'} element={<UserMovies/>}/>
                                    <Route path={'/packages'} element={<UserPackages/>}/>
                                    <Route path={'/transactions'} element={<TransactionHistory/>}/>
                                </Routes>
                            </div>
                        </div>
                    </div>
                </section>
                {/*contact-area-end*/}
            </main>
        </div>
    );
}

export default Account;
