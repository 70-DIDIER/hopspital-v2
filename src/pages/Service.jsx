import { Link } from "react-router-dom";

export default function Service() {
  return (
    <>
      <>
        <div className="container-fluid py-5">
          <div className="container">
            <div className="text-center mx-auto mb-5" style={{ maxWidth: 500 }}>
              <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
                Services
              </h5>
              <h1 className="display-4">Excellents services médicaux</h1>
            </div>
            <div className="row g-5">
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-2x fa-user-md text-white" />
                  </div>
                  <h4 className="mb-3">
                    Urgences médicales
                  </h4>
                  <p className="m-0">
                    <ul>
                      <li><a href="tel:117">📞 Police Secours (117)</a></li>
                      <li><a href="tel:161">📞 Police Secours (161 - Mobile)</a></li>
                      <li><a href="tel:118">🚒 Sapeurs-Pompiers (118)</a></li>
                      <li><a href="tel:+22822212501">🏥 CHU Sylvanus Olympio (+228 22 21 25 01)</a></li>
                    </ul>
                  </p>
                  <a className="btn btn-lg btn-primary rounded-pill" href="">
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-2x fa-procedures text-white" />
                  </div>
                  <h4 className="mb-3">Hôpital &amp; Clinique</h4>
                  <p className="m-0">
                    Trouver les hôpitaux et laboratoire proche de vous
                  </p>
                  <a className="btn btn-lg btn-primary rounded-pill" href="">
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-2x fa-stethoscope text-white" />
                  </div>
                  <h4 className="mb-3">
                    Consultation en ligne
                  </h4>
                  <p className="m-0">
                    Trouvez les docteurs qualifiés pour vos consultations en ligne ou à domicile
                  </p>
                  <a className="btn btn-lg btn-primary rounded-pill" href="">
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-2x fa-ambulance text-white" />
                  </div>
                  <h4 className="mb-3">Service Ambulance</h4>
                  <p className="m-0">
                    Pour les urgences contactez les numeros suivantes :
                    Santé(800), Sapeur pompier(118)
                  </p>
                  <a className="btn btn-lg btn-primary rounded-pill" href="">
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-2x fa-pills text-white" />
                  </div>
                  <h4 className="mb-3">
                    Pharmacie de garde
                  </h4>
                  <p className="m-0">
                    Identifiez rapidement les pharmacies ouvertes 24h/24 et 7j/7 pour obtenir vos médicaments en toute urgence.
                  </p>
                  <Link className="btn btn-lg btn-primary rounded-pill" to="/pharmacies">
                    <i className="bi bi-arrow-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="service-icon mb-4">
                    <i className="fa fa-2x fa-microscope text-white" />
                  </div>
                  <h4 className="mb-3">Blood Testing</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum rebum
                    stet, justo elitr dolor amet sit
                  </p>
                  <a className="btn btn-lg btn-primary rounded-pill" href="">
                    <i className="bi bi-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Services End */}
      </>


    </>
  )
}