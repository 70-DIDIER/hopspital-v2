import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Création du contexte
const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:8000/api/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Token invalide");
                    return res.json();
                })
                .then((data) => {
                    setUser(data); // Met les infos de l'utilisateur connecté
                })
                .catch(() => {
                    setUser(null);
                    localStorage.removeItem("token");
                });
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);
