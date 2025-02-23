
export default function About(){
    return(
        <>
  {/* About Start */}
  <div className="container-fluid py-5">
    <div className="container">
      <div className="row gx-5">
        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: 500 }}>
          <div className="position-relative h-100">
            <img
              className="position-absolute w-100 h-100 rounded"
              src="img/about.jpg"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="mb-4">
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
              A propos
            </h5>
            <h1 className="display-4">
              Meilleurs soins médicaux pour vous et votre famille
            </h1>
          </div>
          <p>
            MyHospital est une application innovante conçue pour faciliter et améliorer l'accès aux soins médicaux en cas d'urgence ou de besoin. Notre mission est de connecter les patients aux hôpitaux, cliniques, pharmacies et professionnels de santé les plus proches, afin d'assurer une intervention rapide et efficace.
          </p>
          <div className="row g-3 pt-3">
            <div className="col-sm-3 col-6">
              <div className="bg-light text-center rounded-circle py-4">
                <i className="fa fa-3x fa-user-md text-primary mb-3" />
                <h6 className="mb-0">
                  Docteur
                  <small className="d-block text-primary">Qualifiés</small>
                </h6>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="bg-light text-center rounded-circle py-4">
                <i className="fa fa-3x fa-procedures text-primary mb-3" />
                <h6 className="mb-0">
                  Service
                  <small className="d-block text-primary">D'urgence</small>
                </h6>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="bg-light text-center rounded-circle py-4">
                <i className="bi bi-3x bi-hospital text-primary mb-3" style={{ fontSize: '3rem' }} />
                <h6 className="mb-0">
                  Hopital/Clinique
                  <small className="d-block text-primary">à proximité</small>
                </h6>
              </div>
            </div>
            <div className="col-sm-3 col-6">
              <div className="bg-light text-center rounded-circle py-4">
                <i className="bi bi-3x bi-calendar-check text-primary mb-3" style={{ fontSize: '3rem' }} />
                <h6 className="mb-0">
                  Prise de <small className="d-block text-primary">Rendez-vous</small>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
</>

      
    )
}