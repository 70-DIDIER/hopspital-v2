import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Service() {
  const [emergencyServices, setEmergencyServices] = useState({
    hospital: null,
    pharmacy: null
  });

  useEffect(() => {
    const fetchEmergencyData = async () => {
      try {
        const overpassQuery = `
          [out:json];
          (
            node["amenity"="hospital"](around:5000,6.172,1.231);
            node["amenity"="pharmacy"](around:5000,6.172,1.231);
          );
          out;
        `;

        const response = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
        );
        const data = await response.json();
        
        // Séparation des résultats par type
        const services = data.elements.reduce((acc, service) => {
          if (service.tags && service.tags.amenity === 'hospital') acc.hospital = service;
          if (service.tags && service.tags.amenity === 'pharmacy') acc.pharmacy = service;
          return acc;
        }, { hospital: null, pharmacy: null });

        setEmergencyServices(services);
      } catch (error) {
        console.error("Erreur de récupération des données:", error);
      }
    };

    fetchEmergencyData();
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 500 }}>
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">
            Services
          </h5>
          <h1 className="display-4">Excellents services médicaux</h1>
        </div>

        <div className="row g-5">
          <div className="col-lg-12">
            <div className="service-item bg-light rounded p-4">
              <h4 className="mb-4">🚨 Services d'urgence prioritaires</h4>
              
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr className="table-primary">
                      <th style={{ width: "40px" }}></th>
                      <th>Établissement</th>
                      <th>Contact</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Hôpital */}
                    {emergencyServices.hospital && (
                      <tr>
                        <td>
                          <i className="fas fa-hospital text-danger fs-4"></i>
                        </td>
                        <td>
                          <strong>{emergencyServices.hospital.tags.name || "Hôpital"}</strong>
                          <br />
                          <small className="text-muted">
                            {emergencyServices.hospital.tags["addr:street"] || ""}
                          </small>
                        </td>
                        <td>
                          {emergencyServices.hospital.tags.phone || "Non renseigné"}
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">
                            Hôpital
                          </span>
                        </td>
                      </tr>
                    )}

                    {/* Pharmacie */}
                    {emergencyServices.pharmacy && (
                      <tr>
                        <td>
                          <i className="fas fa-prescription-bottle-medical text-primary fs-4"></i>
                        </td>
                        <td>
                          <strong>{emergencyServices.pharmacy.tags.name || "Pharmacie"}</strong>
                          <br />
                          <small className="text-muted">
                            {emergencyServices.pharmacy.tags["addr:street"] || ""}
                          </small>
                        </td>
                        <td>
                          {emergencyServices.pharmacy.tags.phone || "Non renseigné"}
                        </td>
                        <td>
                          <span className="badge bg-light text-dark border">
                            Pharmacie
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Numéros d'urgence */}
              <div className="mt-4 p-3 bg-primary rounded">
                <h5 className="text-white mb-3">📞 Numéros d'urgence nationaux :</h5>
                <div className="row text-white">
                  <div className="col-md-4 mb-2">
                    <i className="fas fa-police-car me-2"></i>
                    Police Secours : <a href="tel:117" className="text-white">117</a>
                  </div>
                  <div className="col-md-4 mb-2">
                    <i className="fas fa-fire-extinguisher me-2"></i>
                    Pompiers : <a href="tel:118" className="text-white">118</a>
                  </div>
                  <div className="col-md-4">
                    <i className="fas fa-hospital me-2"></i>
                    CHU Sylvanus : <a href="tel:+22822212501" className="text-white">+228 22 21 25 01</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}