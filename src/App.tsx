import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AssessmentHistory from './pages/AssessmentHistory';
import AssessmentSetup from './pages/AssessmentSetup';
import AssessmentWorkspace from './pages/AssessmentWorkspace';
import EvidenceFindings from './pages/EvidenceFindings';
import CapabilityResult from './pages/CapabilityResult';
import GapAnalysis from './pages/GapAnalysis';
import CompareAssessments from './pages/CompareAssessments';
import Recommendations from './pages/Recommendations';
import './styles/global.css';
import './styles/ui.css';
import './styles/pages.css';

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
      <AssessmentProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/assessments" element={<AssessmentHistory />} />
            <Route path="/assessments/new" element={<AssessmentSetup mode="create" />} />
            <Route path="/assessments/:id" element={<Dashboard />} />
            <Route path="/assessments/:id/setup" element={<AssessmentSetup mode="edit" />} />
            <Route path="/assessments/:id/workspace" element={<AssessmentWorkspace />} />
            <Route path="/assessments/:id/workspace/:objectiveId" element={<AssessmentWorkspace />} />
            <Route path="/assessments/:id/evidence" element={<EvidenceFindings />} />
            <Route path="/assessments/:id/results" element={<CapabilityResult />} />
            <Route path="/assessments/:id/gap" element={<GapAnalysis />} />
            <Route path="/assessments/:id/compare" element={<CompareAssessments />} />
            <Route path="/assessments/:id/recommendations" element={<Recommendations />} />
          </Route>
          <Route path="*" element={<Navigate to="/assessments" replace />} />
        </Routes>
      </AssessmentProvider>
    </BrowserRouter>
  );
}

export default App;
