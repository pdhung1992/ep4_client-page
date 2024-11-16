import SubscribeUs from "../components/SubscribeUs";
import {useEffect} from "react";
import {loadScripts} from "../helpers/script-helpers";
import PricingComp from "../components/PricingComp";


const Pricing = () => {

    useEffect(() => {
        loadScripts();
    }, []);
    return(
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
                                    <h2 className="title">Our Pricing Plan</h2>
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                            <li className="breadcrumb-item active" aria-current="page">Pricing</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*breadcrumb-area-end*/}

                {/*pricing-area*/}
                <PricingComp/>
                {/*pricing-area-end*/}

                <SubscribeUs/>

            </main>
        </div>
    )
}

export default Pricing;
