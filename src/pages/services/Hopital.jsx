import React, { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Badge, Button, Spinner, Alert } from "react-bootstrap";

function Hopital() {
    const [hopitaux, setHopitaux] = useState([]);
    const [location, setLocation] = useState(null);
    const [geoError, setGeoError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fonction de calcul de distance (formule d'Haversine)
    const calculerDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Rayon de la Terre en km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * 
            Math.cos(lat2 * (Math.PI / 180)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Math.round(R * c); // Arrondi au km près
    };

    // Demander la géolocalisation
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

    // Appel API OpenStreetMap pour récupérer les hôpitaux à proximité
    useEffect(() => {
        if (!location) return;

        const fetchHopitaux = async () => {
            try {
                const query = `
                    [out:json];
                    node["amenity"="hospital"](around:10000,${location.latitude},${location.longitude});
                    out body;
                `;

                const response = await axios.get("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query));
                setHopitaux(response.data.elements || []);
            } catch (error) {
                console.error("Erreur de récupération des hôpitaux:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHopitaux();
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
            <h1 className="text-center mb-4">Hôpitaux à Proximité</h1>
            <Accordion defaultActiveKey="0">
                {hopitaux.map((hopital, index) => (
                    <Accordion.Item eventKey={index.toString()} key={hopital.id}>
                        <Accordion.Header className="pe-0">
                            <div className="d-flex w-100 align-items-center pe-0">
                                <strong className="me-auto">{hopital.tags.name || "Hôpital sans nom"}</strong>
                                <Badge bg="primary" className="text-nowrap" style={{ marginLeft: "auto" }}>
                                    📍 {calculerDistance(
                                        location.latitude,
                                        location.longitude,
                                        hopital.lat,
                                        hopital.lon
                                    )} km
                                </Badge>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="row g-3 align-items-start">
                                {/* Colonne descriptions */}
                                <div className="col-md-8">
                                    <p><strong>Nom :</strong> {hopital.tags.name || "Non spécifié"}</p>
                                    <p><strong>Spécialité :</strong> {hopital.tags.speciality || "Non précisée"}</p>
                                    <p><strong>Adresse :</strong> {hopital.tags["addr:street"] || "Non renseignée"}</p>
                                    <Button
                                        variant="info"
                                        href={`https://www.google.com/maps/search/?api=1&query=${hopital.lat},${hopital.lon}`}
                                        target="_blank"
                                        className="mt-2"
                                    >
                                        Voir sur la carte
                                    </Button>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            {/* Message si aucun hôpital trouvé */}
            {hopitaux.length === 0 && (
                <div className="alert alert-primary mt-4">
                    Aucun hôpital trouvé dans votre zone.
                </div>
            )}
        </div>
    );
}

export default Hopital;