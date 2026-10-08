import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: '◫' },
  { path: '/assessments', label: 'Riwayat Asesmen', icon: '☷' },
  { path: '/assessments/setup', label: 'Setup & Design Factor', icon: '⊕' },
  { path: '/evidence', label: 'Evidence', icon: '◈' },
  { path: '/results', label: 'Capability Results', icon: '◉' },
  { path: '/gap-analysis', label: 'Gap Analysis', icon: '◊' },
  { path: '/recommendations', label: 'Recommendations', icon: '◎' },
];

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">COBIT</div>
          <div className="sidebar-subtitle">IT Governance Assessment</div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item${isActive ? ' nav-item--active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">COBIT 2019 DSRM Engine</div>
          <div className="sidebar-footer-version">v2.0</div>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
