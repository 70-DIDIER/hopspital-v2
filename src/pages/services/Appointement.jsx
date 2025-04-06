import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/Api';

export default function Appointment() {
    const { user } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        dateRendezVous: '',
        heureRendezVous: '',
        descriptionRendezVous: '',
        docteur: '',
        typeConsultation: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Chargement des médecins
    useEffect(() => {
        const loadDoctors = async () => {
            try {
                const response = await api.get('/docteurs');
                setDoctors(response.data);
            } catch (err) {
                console.error('Erreur chargement médecins:', err);
                setError('Impossible de charger la liste des médecins');
            } finally {
                setLoading(false);
            }
        };
        loadDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!user) {
            setError('Veuillez vous connecter pour prendre rendez-vous');
            return;
        }

        try {
            // Préparation des données selon le format Postman
            const payload = {
                ...formData,
                patient: user.id,
                heureRendezVous: formData.heureRendezVous + ':00' // Ajout des secondes
            };

            const response = await api.post('/rendezVous', payload);
            
            if (response.status === 201) {
                setSuccess('Rendez-vous enregistré avec succès !');
                setFormData({
                    dateRendezVous: '',
                    heureRendezVous: '',
                    descriptionRendezVous: '',
                    docteur: '',
                    typeConsultation: ''
                });
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 
                              err.response?.data?.detail || 
                              'Erreur lors de la création du rendez-vous';
            setError(errorMessage);
            console.error('Erreur complète:', err.response?.data);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (loading) return <div className="text-center my-5">Chargement des médecins...</div>;

    return (
        <div className="container my-5">
            <div className="card shadow-lg mx-auto" style={{ maxWidth: '800px' }}>
                <div className="card-header bg-primary text-white">
                    <h2 className="mb-0">Prendre un rendez-vous médical</h2>
                </div>
                
                <div className="card-body p-4">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            {/* Type de consultation */}
                            <div className="col-md-6">
                                <label className="form-label">Type de consultation *</label>
                                <select
                                    name="typeConsultation"
                                    className="form-select form-select-lg"
                                    value={formData.typeConsultation}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Sélectionnez...</option>
                                    <option value="Au cabinet">Au cabinet</option>
                                    <option value="En ligne">En ligne</option>
                                    <option value="À domicile">À domicile</option>
                                </select>
                            </div>

                            {/* Choix du médecin */}
                            <div className="col-md-6">
                                <label className="form-label">Médecin *</label>
                                <select
                                    name="docteur"
                                    className="form-select form-select-lg"
                                    value={formData.docteur}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Choisissez un médecin...</option>
                                    {doctors.map(doctor => (
                                        <option key={doctor.id} value={doctor.id}>
                                            Dr. {doctor.nom} {doctor.prenom} ({doctor.specialite})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date et heure */}
                            <div className="col-md-6">
                                <label className="form-label">Date *</label>
                                <input
                                    type="date"
                                    name="dateRendezVous"
                                    className="form-control form-control-lg"
                                    value={formData.dateRendezVous}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="form-label">Heure *</label>
                                <input
                                    type="time"
                                    name="heureRendezVous"
                                    className="form-control form-control-lg"
                                    value={formData.heureRendezVous}
                                    onChange={handleChange}
                                    min="08:00"
                                    max="18:00"
                                    required
                                />
                                <small className="text-muted">Heure de rendez-vous entre 8h et 18h</small>
                            </div>

                            {/* Description */}
                            <div className="col-12">
                                <label className="form-label">Description des symptômes *</label>
                                <textarea
                                    name="descriptionRendezVous"
                                    className="form-control"
                                    rows="4"
                                    value={formData.descriptionRendezVous}
                                    onChange={handleChange}
                                    placeholder="Décrivez en détail la raison de votre consultation..."
                                    required
                                ></textarea>
                            </div>

                            {/* Bouton de soumission */}
                            <div className="col-12">
                                <button 
                                    type="submit" 
                                    className="btn btn-primary btn-lg w-100 py-3"
                                    disabled={!user}
                                >
                                    {user ? 'Confirmer le rendez-vous' : 'Connectez-vous pour continuer'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}