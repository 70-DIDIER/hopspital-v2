import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Form, Card } from 'react-bootstrap';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        // Validation simple
        if (!email.includes('@')) {
            return setError('Email invalide');
        }
        if (password.length < 6) {
            return setError('Le mot de passe doit contenir au moins 6 caractères');
        }

        try {
            setError('');
            setLoading(true);

            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Échec de l\'inscription');
            }

            const data = await response.json();

            // Si l'API renvoie un token JWT
            if (data.token) {
                localStorage.setItem('token', data.token);
                navigate('/profile');
            } else {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            setError(`Échec de l'inscription: ${err.message}`);
        }

        setLoading(false);
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <Card className="w-100" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Créer un compte</h2>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Mot de passe</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button
                            disabled={loading}
                            className="w-100 mb-3"
                            type="submit"
                            variant="primary"
                        >
                            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <Link to="/login" className="text-decoration-none">
                            Déjà un compte ? Se connecter
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}
