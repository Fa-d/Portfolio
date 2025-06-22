import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Will use later

import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Note: In Vite, environment variables prefixed with VITE_ are exposed to the client.
      // The admin API is on a different port during development, so direct fetch needs full URL or proxy.
      // Assuming proxy is set up in vite.config.js for /admin/login to point to the backend.
      // If not, use full URL like 'http://localhost:3001/admin/login'.
      // For now, let's assume proxy or same origin for simplicity in this component.
      const response = await fetch('/admin/login', { // Path will be proxied by Vite dev server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed. Please check your credentials.');
        return;
      }

      if (data.token) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err) {
      console.error('Login API call error:', err);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
