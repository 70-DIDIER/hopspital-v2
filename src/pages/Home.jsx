import React from 'react';
import backgroundImage from '../assets/background.jpg';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  const pageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    color: 'white'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2
  };

  return (
    <div style={pageStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <div className="container-fluid py-5 mb-5 hero-header">
          <div className="container py-5">
            <div className="row justify-content-start">
              <div className="col-12 text-md-center text-sm-start">
                <h3 className="hero-title">
                  Bienvenu sur MyHospital votre application de localisation des services de santé
                </h3>
                {/* Texte complet pour les écrans moyens et grands */}
                <p className="hero-text d-none d-md-block">
                  Vous pouvez rechercher les services de santé les plus proches de votre position géographique
                </p>
                <p className="hero-text d-none d-md-block">
                  Prenez rendez vous avec un medecin qualifié pour vos consultation
                </p>
                {/* Textes simplifiés pour les petits écrans */}
                <p className="hero-text d-block d-md-none">
                  Soins près de chez vous.
                </p>
                <p className="hero-text d-block d-md-none">
                  Médecin rapidement.
                </p>
                <div className="pt-2 d-flex flex-wrap justify-content-center">
                  <Link
                    style={{ backgroundColor: "#0077B6" }}
                    to="/pharmacies"
                    className="btn btn-light rounded-pill hero-btn"
                  >
                    Pharmacie de Garde
                  </Link>
                  <Link
                    style={{ backgroundColor: "#0077B6", color: "#000000", fontWeight: "bold" }}
                    to="/Hopital"
                    className="btn btn-outline-light rounded-pill hero-btn"
                  >
                    Hopital
                  </Link>
                  <Link
                    style={{ backgroundColor: "#0077B6", color: "#000000", fontWeight: "bold" }}
                    to="/appointement"
                    className="btn btn-outline-light rounded-pill hero-btn"
                  >
                    Prendre rendez-vous
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;