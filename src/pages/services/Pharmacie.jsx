import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Badge, Button } from 'react-bootstrap';

function Pharmacies() {
    const [pharmacies, setPharmacies] = useState([]);

    // Configuration des identifiants
    const API_CONFIG = {
        endpoint: '/api/pharmacies/garde',
        apiKey: 'bSy_4oxX4QcJ6aVcSjAkxkX5lA8E17i2',
        access_token: 'BLeXll8d3ilRHgZjqxj7oHqJnrxIO2ca',
        c_identifiant: 'g5IoGDIaSOLbEj7n-in4U4Ao42_eZHgQ',
        u_identifiant: 'At5MwG82mbKa5hgPLOCS7oXnACsVg2yO',
        client: JSON.stringify({ fullname: "Jerome", phone: "+22891121670" }),
        latitude: '6.1953',
        longitude: '1.1996'
    };

    useEffect(() => {
        const formData = new FormData();

        // Ajout des paramètres obligatoires
        formData.append('access_token', API_CONFIG.access_token);
        formData.append('c_identifiant', API_CONFIG.c_identifiant);
        formData.append('u_identifiant', API_CONFIG.u_identifiant);
        formData.append('client', API_CONFIG.client);

        // Ajout des paramètres optionnels
        formData.append('latitude', API_CONFIG.latitude);
        formData.append('longitude', API_CONFIG.longitude);

        axios.post(
            API_CONFIG.endpoint,
            formData,
            {
                headers: {
                    'apiKey': API_CONFIG.apiKey // Seul l'apiKey dans les headers
                }
            }
        )
            .then(response => {
                const data = response.data;
                if (data.status === "000") {
                    setPharmacies(data.pharmacies || []);
                } else {
                    console.error('Erreur API:', data.message);
                }
            })
            .catch(error => console.error('Erreur réseau:', error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Pharmacies de Garde</h1>
            <Accordion>
                {pharmacies.map((pharmacie, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>
                            <strong>{pharmacie.nom}</strong>
                            <Badge bg="success" className="ms-2">
                                DE GARDE {pharmacie.distance && `- ${pharmacie.distance}`}
                            </Badge>
                        </Accordion.Header>
                        <Accordion.Body>
                            {pharmacie.photo && (
                                <div className="mb-3 justify-content-center d-flex">
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
                            )}
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
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            {/* Message si aucune pharmacie trouvée */}
            {pharmacies.length === 0 && (
                <div className="alert alert-warning mt-4">
                    Aucune pharmacie de garde trouvée pour cette période.
                </div>
            )}
        </div>
    );
}

export default Pharmacies;