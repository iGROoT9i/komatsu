import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logo-komatsu">KOMATSU</div>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-dark)', fontSize: '14px', fontWeight: '600' }}>
          📊 Historial
        </Link>
        <div className="logo-kowa">
          <span>K</span> KOWA Analysis
        </div>
      </div>
    </header>
  );
};

export default Header;
