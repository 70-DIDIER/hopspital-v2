import React, { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Badge, Button, Spinner, Alert } from "react-bootstrap";

function Hopital() {
    const [etablissements, setEtablissements] = useState([]);
    const [location, setLocation] = useState(null);
    const [geoError, setGeoError] = useState(null);
    const [loading, setLoading] = useState(true);

    const calculerDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * 
            Math.cos(lat2 * (Math.PI / 180)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c);
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            setGeoError("La géolocalisation n'est pas supportée par votre navigateur");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setGeoError(null);
            },
            (error) => {
                setGeoError("Vous devez autoriser la géolocalisation pour utiliser ce service");
                console.error('Erreur de géolocalisation:', error);
            }
        );
    }, []);

    useEffect(() => {
        if (!location) return;

        const fetchEtablissements = async () => {
            try {
                const query = `
                    [out:json];
                    (
                        node["amenity"~"hospital|clinic|doctors"](around:10000,${location.latitude},${location.longitude});
                        way["amenity"~"hospital|clinic|doctors"](around:10000,${location.latitude},${location.longitude});
                        relation["amenity"~"hospital|clinic|doctors"](around:10000,${location.latitude},${location.longitude});
                    );
                    out body;
                    >;
                    out skel qt;
                `;

                const response = await axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
                
                const results = response.data.elements
                    .filter(el => el.tags && el.tags.name)
                    .map(etablissement => ({
                        ...etablissement,
                        distance: calculerDistance(
                            location.latitude,
                            location.longitude,
                            etablissement.lat,
                            etablissement.lon
                        )
                    }))
                    .sort((a, b) => a.distance - b.distance);

                setEtablissements(results);
            } catch (error) {
                console.error("Erreur de récupération des données:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEtablissements();
    }, [location]);

    if (geoError) {
        return (
            <div className="container mt-5 text-center">
                <Alert variant="danger" className="mt-4">
                    {geoError}
                    <div className="mt-2">
                        <Button onClick={() => window.location.reload()} variant="outline-danger">
                            Réessayer
                        </Button>
                    </div>
                </Alert>
            </div>
        );
    }

    if (loading || !location) {
        return (
            <div className="container mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </Spinner>
                <p className="mt-2">Autorisation de géolocalisation requise...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Établissements de Santé à Proximité</h1>
            <Accordion defaultActiveKey="0">
                {etablissements.map((etablissement, index) => (
                    <Accordion.Item eventKey={index.toString()} key={etablissement.id}>
                        <Accordion.Header className="pe-0">
                            <div className="d-flex w-100 align-items-center pe-0">
                                <strong className="me-auto">
                                    {etablissement.tags.name}
                                    <small className="text-muted d-block mt-1">
                                        {{
                                            hospital: "Hôpital",
                                            clinic: "Clinique",
                                            doctors: "Cabinet médical"
                                        }[etablissement.tags.amenity] || "Établissement de santé"}
                                    </small>
                                </strong>
                                <Badge bg="primary" className="text-nowrap ms-2">
                                    {etablissement.distance} km
                                </Badge>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="row g-3 align-items-start">
                                <div className="col-md-8">
                                    <p><strong>Type :</strong> {etablissement.tags.amenity}</p>
                                    <p><strong>Adresse :</strong> {etablissement.tags["addr:street"] || "Non renseignée"}</p>
                                    <p><strong>Téléphone :</strong> {etablissement.tags.phone || "Non disponible"}</p>
                                    <Button
                                        variant="info"
                                        href={`https://www.google.com/maps/search/?api=1&query=${etablissement.lat},${etablissement.lon}`}
                                        target="_blank"
                                        className="mt-2"
                                    >
                                        Itinéraire
                                    </Button>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            {etablissements.length === 0 && (
                <div className="alert alert-primary mt-4">
                    Aucun établissement de santé trouvé dans un rayon de 10 km.
                </div>
            )}
        </div>
    );
}

export default Hopital;