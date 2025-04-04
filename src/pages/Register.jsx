import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Déclare handleSubmit comme une fonction async
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêcher la soumission du formulaire par défaut

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                let errorMessage = "Inscription échouée";
                try {
                    const data = await response.json();
                    errorMessage = data.message || errorMessage;
                } catch (_) {}
                throw new Error(errorMessage);
            }

            navigate("/home"); // Rediriger après inscription réussie
        } catch (err) {
            setError("Erreur d'inscription : " + err.message);
        }
    };

    return (
        <>
            <div className="container col-6 mt-5 ">
                <form onSubmit={handleSubmit} role="form">
                    {/* Email */}
                    <div className="form-outline mb-4">
                        <input
                            type="email"
                            className="form-control"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="form-label">Email</label>
                    </div>

                    {/* Mot de passe */}
                    <div className="form-outline mb-4">
                        <input
                            type="password"
                            className="form-control"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label">Mot de passe</label>
                    </div>

                    {/* Répéter le mot de passe */}
                    <div className="form-outline mb-4">
                        <input
                            type="password"
                            className="form-control"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label className="form-label">Confirmez votre mot de passe</label>
                    </div>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button type="submit" className="btn btn-primary btn-block mb-3">
                        S'inscrire
                    </button>
                </form>
            </div>
        </>
    );
}
