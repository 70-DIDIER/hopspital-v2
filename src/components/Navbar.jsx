import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, setUser } = useAuth(); // assure-toi que setUser est bien exposé dans ton context
    const navigate = useNavigate();

    const handleLogout = () => {
        // Supprimer le token ou tout autre info utilisateur
        localStorage.removeItem("token");
        setUser(null); // Remettre l'utilisateur à null dans le contexte
        navigate("/login"); // Rediriger vers login
    };

    return (
        <div className="container-fluid sticky-top bg-white shadow-sm">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
                    <Link to="/" className="navbar-brand">
                        <h1 className="m-0 logo" style={{ color: "#0077B6" }}>
                            <i className="bi bi-h-square" style={{ color: "#0077B6" }}></i>
                            MyHospital
                        </h1>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <Link to="/" className="nav-item nav-link">
                                Accueil
                            </Link>
                            <Link to="/about" className="nav-item nav-link">
                                A propos
                            </Link>
                            <Link to="/service" className="nav-item nav-link">
                                Service
                            </Link>
                            <div className="nav-item dropdown">
                                <Link
                                    to="#"
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Pages
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link to="/appointement" className="dropdown-item">
                                            Rendez-vous
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/pharmacies" className="dropdown-item">
                                            Trouver les pharmacies de garde
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="dropdown-item">
                                            Recherche
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <Link to="/contact" className="nav-item nav-link me-5">
                                Contact
                            </Link>

                            {/* Affichage de Connexion ou Déconnexion selon l'état de l'utilisateur */}
                            {user ? (
                                <button onClick={handleLogout} className="login-button">
                                    Déconnexion
                                </button>
                            ) : (
                                <Link to="/login" className="login-button">
                                    Connexion
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
