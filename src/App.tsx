import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AssessmentSetup from './pages/AssessmentSetup';
import AssessmentWorkspace from './pages/AssessmentWorkspace';
import EvidenceFindings from './pages/EvidenceFindings';
import CapabilityResult from './pages/CapabilityResult';
import GapAnalysis from './pages/GapAnalysis';
import Recommendations from './pages/Recommendations';
import './styles/global.css';
import './styles/ui.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessments/setup" element={<AssessmentSetup />} />
          <Route path="/assessments/workspace/:objectiveId" element={<AssessmentWorkspace />} />
          <Route path="/evidence" element={<EvidenceFindings />} />
          <Route path="/results" element={<CapabilityResult />} />
          <Route path="/gap-analysis" element={<GapAnalysis />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
