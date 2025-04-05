import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/Api";

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Enregistrement
            const registerResponse = await api.post('/register', {
                email: formData.email,
                password: formData.password
            });

            if (!registerResponse.data.message.includes("succès")) {
                throw new Error(registerResponse.data.message || "Erreur lors de l'inscription");
            }

            // 2. Connexion automatique
            const loginResult = await login(formData.email, formData.password);
            
            if (loginResult.success) {
                navigate("/"); // Redirection vers la page d'accueil
            } else {
                throw new Error("Connexion automatique échouée");
            }

        } catch (err) {
            console.error("Registration error:", err);
            setError(err.response?.data?.message || err.message || "Erreur lors de l'inscription");
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="container col-md-6 col-lg-4 mt-5">
            <div className="card shadow">
                <div className="card-body p-4">
                    <h2 className="text-center mb-4">Inscription</h2>
                    
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                minLength="6"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="form-label">Confirmation</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
                        </button>
                    </form>

                    <div className="mt-3 text-center">
                        <p>Déjà inscrit ? <a href="/login">Connectez-vous</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}