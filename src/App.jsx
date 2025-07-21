import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

// Public pages
import Home from './pages/user/Home';
import DemoPage from './pages/user/DemoPage';
import NotFound from './pages/user/NotFound';
import Qrcode from './pages/user/Qrcode';

// Admin layout + pages
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import DemoList from './pages/admin/DemoList';
import FeedbackList from './pages/admin/FeedbackList';
import ProposalList from './pages/admin/ProposalList';
import DemoEditor from './pages/admin/DemoEditor';
import Login from './pages/admin/Login';

// New Components
import ContactForm from './pages/ContactForm';
import SubscribeForm from './pages/SubscribeForm';
import CookieConsent from './pages/CookieConsent';

function AppWrapper() {
  return (
    <CookiesProvider>
      <App />
    </CookiesProvider>
  );
}

function App() {
  const { token } = useAuth();
  const [cookies, setCookie] = useCookies(['cookieConsent']);
  const [showConsent, setShowConsent] = useState(false);
  const [analyticsLoaded, setAnalyticsLoaded] = useState(false);

  useEffect(() => {
    if (!cookies.cookieConsent) {
      setShowConsent(true);
    } else if (cookies.cookieConsent === 'accepted' && !analyticsLoaded) {
      loadAnalytics();
    }
  }, [cookies, analyticsLoaded]);

  const loadAnalytics = () => {
    // Load your analytics scripts here
    console.log('Loading analytics scripts...');
    setAnalyticsLoaded(true);
  };

  const handleConsent = (consent) => {
    setCookie('cookieConsent', consent, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    setShowConsent(false);

    if (consent === 'accepted' || (typeof consent === 'object' && consent.analytics)) {
      loadAnalytics();
    }
  };

  return (
    <BrowserRouter>
      {showConsent && <CookieConsent onConsent={handleConsent} />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Qrcode />} />
        <Route path="/demo/:slug" element={<DemoPage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/subscribe" element={<SubscribeForm />} />
        <Route path="/admin/login" element={<Login />} />

        {/* Admin protected routes */}
        <Route
          path="/admin"
          element={
            token ? <AdminLayout /> : <Navigate to="/admin/login" replace />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="demos" element={<DemoList />} />
          <Route path="demos/:slug/edit" element={<DemoEditor />} />
          <Route path="feedbacks" element={<FeedbackList />} />
          <Route path="proposals" element={<ProposalList />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppWrapper;