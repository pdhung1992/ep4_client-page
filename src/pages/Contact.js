import SubscribeUs from "../components/SubscribeUs";
import {useEffect} from "react";
import {loadScripts} from "../helpers/script-helpers";


const Contact = () => {
    useEffect(() => {
        loadScripts();
    }, []);
    return (
        <div>
            {/*main-area*/}
            <main>

                {/*breadcrumb-area*/}
                <section className="breadcrumb-area breadcrumb-bg" data-background="/assets/img/bg/breadcrumb_bg.png">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-content">
                                    <h2 className="title">Contact Us</h2>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Contact</li>
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
                            <div className="col-xl-8 col-lg-7">
                                <div className="contact-form-wrap">
                                    <div className="widget-title mb-50">
                                        <h5 className="title">Send Us a Message</h5>
                                    </div>
                                    <div className="contact-form">
                                        <form action="#">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <input type="text" placeholder="You Name *"/>
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="email" placeholder="You  Email *"/>
                                                </div>
                                            </div>
                                            <input type="text" placeholder="Subject *"/>
                                                <textarea name="message" placeholder="Type Your Message..."/>
                                                <button className="btn">Send Message</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-5">
                                <div className="widget-title mb-50">
                                    <h5 className="title">Our Information</h5>
                                </div>
                                <div className="contact-info-wrap">
                                    <p><span>Find solutions :</span> to common problems, or get help from a support agent industry's standard .</p>
                                    <div className="contact-info-list">
                                        <ul>
                                            <li>
                                                <div className="icon"><i className="fas fa-map-marker-alt"></i></div>
                                                <p><span>Address :</span> 08 Ton That Thuyet, Ha Noi</p>
                                            </li>
                                            <li>
                                                <div className="icon"><i className="fas fa-phone-alt"></i></div>
                                                <p><span>Phone :</span> (09) 123 456 789</p>
                                            </li>
                                            <li>
                                                <div className="icon"><i className="fas fa-envelope"></i></div>
                                                <p><span>Email :</span> contact@moviex.com</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*contact-area-end*/}

                <SubscribeUs/>

            </main>
            {/*main-area-end*/}
        </div>
    );
}

export default Contact;
