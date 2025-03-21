import React, { useState } from "react";
import { auth } from "../firebase"; // Assure-toi que ton fichier firebase.js est bien configuré
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas !");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/"); // Redirige après inscription réussie
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
