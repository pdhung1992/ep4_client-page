

const SubscribeUs = () => {
    return (
        <div>
            {/*newsletter-area*/}
            <section className="newsletter-area newsletter-bg" data-background="/assets/img/bg/newsletter_bg.jpg">
                <div className="container">
                    <div className="newsletter-inner-wrap">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="newsletter-content">
                                    <h4>Subscribe MovieX.</h4>
                                    <p>Enter your email to create or restart your membership.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <form action="#" className="newsletter-form">
                                    <input type="email" required placeholder="Enter your email"/>
                                    <button className="btn">get started</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*newsletter-area-end*/}
        </div>
    )
}

export default SubscribeUs;
