import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // chemin mis à jour
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setError('Erreur lors de la déconnexion');
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Exemple de mise à jour via une API Symfony
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: displayName }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Mise à jour échouée');
      }

      setSuccess('Profil mis à jour avec succès !');
    } catch (err) {
      setError('Erreur de mise à jour : ' + err.message);
    }

    setLoading(false);
  }

  return (
      <div className="container mt-5">
        <Card className="shadow">
          <Card.Body>
            <h2 className="text-center mb-4">Mon Profil Médical</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleUpdateProfile}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={user?.email}
                    disabled
                    readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nom complet</Form.Label>
                <Form.Control
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Dr. Jean Dupont"
                />
              </Form.Group>

              <Button
                  disabled={loading}
                  type="submit"
                  variant="primary"
                  className="w-100 mb-3"
              >
                {loading ? 'Mise à jour...' : 'Mettre à jour'}
              </Button>
            </Form>

            <div className="text-center mt-4">
              <Link to="/appointement" className="btn btn-secondary me-2">
                Mes Rendez-vous
              </Link>
              <Button
                  variant="danger"
                  onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
  );
}
