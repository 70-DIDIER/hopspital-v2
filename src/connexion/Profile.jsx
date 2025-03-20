import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      setError('Erreur lors de la déconnexion');
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: displayName
      });
      Alert.success('Profil mis à jour !');
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

          <Form onSubmit={handleUpdateProfile}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentUser?.email}
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