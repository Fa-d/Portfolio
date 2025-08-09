import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const navItems = [
    { path: 'articles', label: 'Articles', icon: '📰' },
    { path: 'notes', label: 'Notes', icon: '📝' },
    { path: 'career', label: 'Career', icon: '💼' },
    { path: 'education', label: 'Education', icon: '🎓' },
    { path: 'projects', label: 'Projects', icon: '🚀' },
    { path: 'skills', label: 'Skills', icon: '🛠️' },
    { path: 'strings', label: 'Site Strings', icon: '🔤' },
  ];

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    } as React.CSSProperties,
    sidebar: {
      width: '280px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '2rem',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
    } as React.CSSProperties,
    header: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textAlign: 'center' as const,
    },
    nav: {
      marginBottom: '2rem',
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    navItem: {
      marginBottom: '0.5rem',
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      fontSize: '1rem',
    } as React.CSSProperties,
    navLinkActive: {
      background: 'rgba(255,255,255,0.2)',
      backdropFilter: 'blur(10px)',
    } as React.CSSProperties,
    navIcon: {
      marginRight: '0.75rem',
      fontSize: '1.2rem',
    },
    logoutBtn: {
      width: '100%',
      padding: '1rem',
      background: 'rgba(255,255,255,0.1)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: 'white',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
    } as React.CSSProperties,
    content: {
      flex: 1,
      padding: '2rem',
      background: '#f8fafc',
      overflow: 'auto',
    } as React.CSSProperties,
    contentHeader: {
      fontSize: '1.8rem',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #e2e8f0',
    },
  };

  const getCurrentSection = () => {
    const currentPath = location.pathname.split('/').pop() || '';
    const currentItem = navItems.find(item => item.path === currentPath);
    return currentItem ? `${currentItem.icon} ${currentItem.label}` : 'Dashboard';
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.header}>🔧 Admin Panel</h2>
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            {navItems.map((item) => {
              const isActive = location.pathname.includes(item.path);
              return (
                <li key={item.path} style={styles.navItem}>
                  <Link 
                    to={item.path}
                    style={{
                      ...styles.navLink,
                      ...(isActive ? styles.navLinkActive : {}),
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span style={styles.navIcon}>{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button 
          onClick={handleLogout} 
          style={styles.logoutBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          }}
        >
          🚪 Logout
        </button>
      </div>
      <div style={styles.content}>
        <h3 style={styles.contentHeader}>{getCurrentSection()}</h3>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
