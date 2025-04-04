import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Réinitialiser les erreurs
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/"); // Redirige après inscription réussie
        } catch (err) {
            setError("Échec de la connexion : " + err.message);
        }
    };

    return (
        <section className="" style={{ backgroundColor: "gray" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img
                                        src="https://i.postimg.cc/4dt6k518/male-nurse-working-clinic.jpg"
                                        alt="login form"
                                        className="img-fluid"
                                        style={{ borderRadius: "1rem 0 0 1rem", height: "500px" }}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">
                                        <form onSubmit={handleLogin}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                               
                                                <i className="bi bi-h-square fa-2x me-3" style={{ color: "#0077B6" }}></i>
                                                <span className="h1 fw-bold mb-0">MyHospital</span>
                                            </div>
                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>
                                            Connectez-vous à votre compte
                                            </h5>
                                            {error && <p style={{ color: "red" }}>{error}</p>}
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="email"
                                                    id="form2Example17"
                                                    className="form-control form-control-lg"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="form2Example17">
                                                Votre Adresse Email
                                                </label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="form2Example27"
                                                    className="form-control form-control-lg"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="form2Example27">
                                                    Votre mot de passe
                                                </label>
                                            </div>
                                            <div className="pt-1 mb-4">
                                                <button
                                                    className="btn btn-dark btn-lg btn-block"
                                                    type="submit"
                                                >
                                                   Se connecter
                                                </button>
                                            </div>
                                            <a className="small text-muted" href="#!">
                                            Mot de passe oublié ?
                                            </a>
                                            <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                            N'avez-vous pas de compte ?{" "}
                                                <a href="/register" className="login-button" style={{ color: "#393f81" }}>
                                                <span style={{ color: "#ffff" }}>Inscrivez-vous ici</span>
                                                </a>
                                            </p>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
