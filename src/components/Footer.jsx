
function Footer() {
    return (
        <>
            <div className="container-fluid bg-dark text-light mt-5 py-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h4 className="d-inline-block custom-btn text-uppercase border-bottom border-5 border-secondary mb-4">
                                CONTACTEZ-NOUS
                            </h4>
                            <p className="mb-4">
                                Pour plus d'information, contactez-nous sur:
                            </p>
                            <p className="mb-2">
                                <i className="bi bi-geo-alt  me-3" style={{ color: '#0077B6' }}></i>
                                Lomé, TOGO
                            </p>
                            <p className="mb-2">
                                <i className="bi bi-envelope  me-3" style={{ color: '#0077B6' }}></i>
                                adiloukoffi@ipnet.institute.com
                            </p>
                            <p className="mb-0">
                                <i className="bi bi-telephone  me-3" style={{ color: '#0077B6' }}/>
                                96712198 /  96827451
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="d-inline-block custom-btn text-uppercase border-bottom border-5 border-secondary mb-4">
                                Liens Rapide
                            </h4>
                            <div className="d-flex flex-column">
                                <a href="/" className="text-light mb-2">
                                    <i className="bi bi-chevron-right me-2" style={{ color: '#0077B6' }}/> Accueil
                                </a>
                                <a href="/contact" className="text-light mb-2">
                                    <i className="bi bi-chevron-right me-2" /> A propos
                                </a>
                                <a href="/about" className="text-light mb-2">
                                    <i className="bi bi-chevron-right me-2" /> Service
                                </a>
                                <a href="/services" className="text-light mb-2">
                                    <i className="bi bi-chevron-right me-2" /> Contact
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="d-inline-block custom-btn text-uppercase border-bottom border-5 border-secondary mb-4">
                                SUIVEZ-NOUS
                            </h4>
                            <div className="d-flex">
                                <a className="btn btn-lg custom-btn btn-lg-square rounded-circle me-2" href="#">
                                    <i className="bi bi-twitter"></i>
                                </a>
                                <a className="btn btn-lg custom-btn btn-lg-square rounded-circle me-2" href="#">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a className="btn btn-lg custom-btn btn-lg-square rounded-circle me-2" href="#">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                                <a className="btn btn-lg custom-btn btn-lg-square rounded-circle" href="#">
                                    <i className="bi bi-instagram"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="d-inline-block custom-btn text-uppercase border-bottom border-5 border-secondary mb-4">
                                LETTRE D'INFORMATION
                            </h4>
                            <form action="">
                                <div className="input-group">
                                    <input type="text" className="form-control p-3 border-0" placeholder="Your Email Address" />
                                    <button className="btn btn-primary ">Connectez-vous</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="container-fluid bg-dark text-light border-top border-secondary py-4">
                    <div className="container">
                    <div className="row g-5">
                        <div className="col-md-6 text-center text-md-start">
                        <p className="mb-md-0">
                            ©{" "}
                            <a className="custom-btn" href="#">
                           MyHospital
                            </a>
                            . Tous droits reservé.
                        </p>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                        <p className="mb-0">
                            Designed by{" "}
                            <a className="custom-btn" href="https://htmlcodex.com">
                            Myhospital Developer
                            </a>
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <a href="#" className="btn btn-lg custom-btn btn-lg-square back-to-top">
                <i className="bi bi-arrow-up" />
            </a>
        </>
    );
}



export default Footer;