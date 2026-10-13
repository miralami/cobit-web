import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings2,
  ClipboardList,
  FileSearch,
  BarChart3,
  GitMerge,
  TrendingUp,
  Lightbulb,
  History,
  ArrowLeft,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import { useAssessment } from '../context';
import ReferencePanel from './ReferencePanel';
import './Layout.css';

interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const WORKFLOW_NAV: NavGroup[] = [
  {
    title: 'Workflow',
    items: [
      { path: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: 'setup', label: 'Setup & Design Factor', icon: Settings2 },
      { path: 'workspace', label: 'Workspace Asesmen', icon: ClipboardList },
    ],
  },
  {
    title: 'Output',
    items: [
      { path: 'evidence', label: 'Evidence Register', icon: FileSearch },
      { path: 'results', label: 'Capability Results', icon: BarChart3 },
      { path: 'gap', label: 'Gap Analysis', icon: GitMerge },
      { path: 'compare', label: 'Perbandingan', icon: TrendingUp },
      { path: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    ],
  },
];

function Breadcrumb() {
  const location = useLocation();
  const { state } = useAssessment();
  const pathParts = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumb on landing or assessments list
  if (pathParts.length === 0 || (pathParts[0] === 'assessments' && pathParts.length === 1)) {
    return null;
  }

  const crumbs: { label: string; path: string }[] = [];

  if (pathParts[0] === 'assessments') {
    if (pathParts[1] === 'new') {
      crumbs.push({ label: 'Daftar Asesmen', path: '/assessments' });
      crumbs.push({ label: 'Asesmen Baru', path: '' });
    } else if (pathParts[1]) {
      crumbs.push({ label: 'Daftar Asesmen', path: '/assessments' });
      crumbs.push({ label: state.title || 'Asesmen', path: `/assessments/${pathParts[1]}` });

      if (pathParts[2]) {
        const section = pathParts[2];
        const sectionLabels: Record<string, string> = {
          setup: 'Setup & Design Factor',
          workspace: 'Workspace Asesmen',
          evidence: 'Evidence Register',
          results: 'Capability Results',
          gap: 'Gap Analysis',
          compare: 'Perbandingan',
          recommendations: 'Recommendations',
        };
        crumbs.push({ label: sectionLabels[section] || section, path: '' });
      }
    }
  }

  if (crumbs.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={i} className="breadcrumb__item">
          {i > 0 && <span className="breadcrumb__sep">›</span>}
          {crumb.path ? (
            <NavLink to={crumb.path} className="breadcrumb__link">
              {crumb.label}
            </NavLink>
          ) : (
            <span className="breadcrumb__current">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default function Layout() {
  const location = useLocation();
  const { state } = useAssessment();
  const [refOpen, setRefOpen] = useState(false);

  // Detect if we're inside an assessment
  const inAssessment = location.pathname.match(/^\/assessments\/(?!new)(.+?)(?:\/|$)/);
  const assessmentId = inAssessment ? inAssessment[1] : null;

  // Build base path for nav links
  const basePath = assessmentId ? `/assessments/${assessmentId}` : '';

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">COBIT</div>
          <div className="sidebar-subtitle">IT Governance Assessment</div>
        </div>

        {assessmentId && (
          <div className="sidebar-context">
            <NavLink to="/assessments" className="sidebar-back">
              <ArrowLeft size={14} />
              <span>Kembali ke Daftar</span>
            </NavLink>
            <div className="sidebar-assessment-info">
              <div className="sidebar-assessment-title">{state.title || 'Asesmen'}</div>
              <div className="sidebar-assessment-meta">
                {state.organization} · {state.period}
              </div>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          {!assessmentId ? (
            <div className="nav-group">
              <div className="nav-group-label">Menu</div>
              <NavLink
                to="/assessments"
                className={({ isActive }) => `nav-item${isActive ? ' nav-item--active' : ''}`}
              >
                <span className="nav-icon">
                  <History size={16} strokeWidth={1.9} aria-hidden="true" />
                </span>
                <span className="nav-label">Daftar Asesmen</span>
              </NavLink>
            </div>
          ) : (
            WORKFLOW_NAV.map((group) => (
              <div key={group.title} className="nav-group">
                <div className="nav-group-label">{group.title}</div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const itemPath = `${basePath}/${item.path}`;
                  return (
                    <NavLink
                      key={item.path}
                      to={itemPath}
                      className={({ isActive }) =>
                        `nav-item${isActive ? ' nav-item--active' : ''}`
                      }
                    >
                      <span className="nav-icon">
                        <Icon size={16} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="nav-label">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            ))
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-text">COBIT 2019 DSRM Engine</div>
          <div className="sidebar-footer-version">v2.0</div>
        </div>
      </aside>

      <main className="main-content">
        <Breadcrumb />
        <Outlet />
      </main>

      {/* COBIT Reference Panel trigger */}
      <button
        className="ref-trigger"
        onClick={() => setRefOpen(true)}
        title="Open COBIT 2019 Reference"
      >
        <BookOpen size={18} />
        <span className="ref-trigger__label">COBIT Guide</span>
      </button>

      <ReferencePanel open={refOpen} onClose={() => setRefOpen(false)} />
    </div>
  );
}
