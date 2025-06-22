import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li><Link to="articles">Manage Articles</Link></li>
          <li><Link to="notes">Manage Notes</Link></li>
          <li><Link to="career">Manage Career</Link></li>
          <li><Link to="education">Manage Education</Link></li>
          <li><Link to="projects">Manage Projects</Link></li>
          <li><Link to="skills">Manage Skills</Link></li>
          <li><Link to="strings">Manage Site Strings</Link></li>
        </ul>
      </nav>
      <button onClick={handleLogout} style={{ marginTop: '20px', marginBottom: '20px' }}>Logout</button>
      <hr />
      <div>
        <h3>Selected Section:</h3>
        {/* Outlet will render the matched nested route component (e.g., ManageArticles) */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
