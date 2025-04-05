import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from "../services/Api"; // Notez la minuscule pour cohérence

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // Option 1: Si vous avez /users/me
                const response = await api.get('/me');
                setUser(response.data);
                
                // Option 2: Si vous n'avez pas /users/me
                // setUser({ token }); // Stockez juste le token
            } catch (error) {
                console.error("Session validation failed:", error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/login_check', {
                username: email, // Notez le champ "username" requis par Symfony
                password
            });
            
            const { token } = response.data;
            localStorage.setItem('token', token);
            
            // Si vous avez /users/me
            const userResponse = await api.get('/me');
            setUser(userResponse.data);
            
            return { success: true, user: userResponse.data };
        } catch (error) {
            console.error("Login error:", error);
            return { 
                success: false, 
                error: error.response?.data?.message || "Échec de la connexion"
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};