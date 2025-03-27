import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Badge, Button, Spinner, Alert } from 'react-bootstrap';

function Pharmacies() {
    const [pharmacies, setPharmacies] = useState([]);
    const [location, setLocation] = useState(null);
    const [geoError, setGeoError] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_CONFIG = {
        endpoint: '/api/pharmacies/garde',
        apiKey: 'bSy_4oxX4QcJ6aVcSjAkxkX5lA8E17i2',
        access_token: 'BLeXll8d3ilRHgZjqxj7oHqJnrxIO2ca',
        c_identifiant: 'g5IoGDIaSOLbEj7n-in4U4Ao42_eZHgQ',
        u_identifiant: 'At5MwG82mbKa5hgPLOCS7oXnACsVg2yO',
        client: JSON.stringify({ fullname: "Jerome", phone: "+22891121670" }),
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

    // Appel API quand la localisation est obtenue
    useEffect(() => {
        if (!location) return;

        const fetchPharmacies = async () => {
            try {
                const formData = new FormData();
                Object.entries({
                    ...API_CONFIG,
                    latitude: location.latitude,
                    longitude: location.longitude
                }).forEach(([key, value]) => {
                    if (key !== 'endpoint' && key !== 'apiKey') formData.append(key, value);
                });

                const response = await axios.post(API_CONFIG.endpoint, formData, {
                    headers: { 'apiKey': API_CONFIG.apiKey }
                });

                if (response.data.status === "000") {
                    setPharmacies(response.data.pharmacies || []);
                }
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPharmacies();
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
            <h1 className="text-center mb-4">Pharmacies de Garde</h1>
            <Accordion defaultActiveKey="0">
                {pharmacies.map((pharmacie, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header className="pe-0">
                            <div className="d-flex w-100 align-items-center pe-0">
                                <strong className="me-auto">{pharmacie.nom}</strong>
                                <Badge
                                    bg="primary"
                                    className="text-nowrap"
                                    style={{ marginLeft: 'auto' }}>
                                    DE GARDE {pharmacie.distance && `- ${pharmacie.distance}`}
                                </Badge>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="row g-3 align-items-start">
                                {/* Colonne photo */}
                                {pharmacie.photo && (
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <img
                                                src={pharmacie.photo}
                                                alt={`Photo de ${pharmacie.nom}`}
                                                style={{
                                                    width: '100%',
                                                    maxWidth: '300px',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Colonne descriptions */}
                                <div className="col-md-8">
                                    <p><strong>Adresse :</strong> {pharmacie.adresse}</p>
                                    <p><strong>Ville :</strong> {pharmacie.ville}</p>
                                    <p><strong>Distance :</strong> {pharmacie.distance}</p>
                                    <p><strong>Contact :</strong> {pharmacie.contact_1}</p>
                                    {pharmacie.contact_2 && (
                                        <p><strong>Contact secondaire :</strong> {pharmacie.contact_2}</p>
                                    )}
                                    <Button
                                        variant="info"
                                        href={pharmacie.map_link}
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

            {/* Message si aucune pharmacie trouvée */}
            {pharmacies.length === 0 && (
                <div className="alert alert-primary mt-4">
                    Aucune pharmacie de garde trouvée pour cette période.
                </div>
            )}
        </div>
    );
}

export default Pharmacies;