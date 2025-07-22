import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect, useState } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { motion, AnimatePresence } from 'framer-motion';

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

// New Pages to Add
import NewAuth from './pages/Auth'; // Your new auth page
import NewDashboard from './pages/Dashboard'; // Your new dashboard page
import TTSGenerator from './components/Dashboard/TTSGenerator';
import QRGenerator from './components/Dashboard/QRGenerator';
import CreateDemoItem from './components/Dashboard/CreateDemoItem';
import DemoItemCard from './components/Dashboard/DemoItemCard';

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

      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Home />
              </motion.div>
            } 
          />
          
          <Route 
            path="/auth" 
            element={
              token ? (
                <Navigate to="/app/dashboard" replace />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NewAuth />
                </motion.div>
              )
            } 
          />
          
          <Route 
            path="/app/*" 
            element={
              token ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NewDashboard />
                </motion.div>
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          >
            <Route path="dashboard" element={<DemoItemCard />} />
            <Route path="create-demo" element={<CreateDemoItem />} />
            <Route path="tts-generator" element={<TTSGenerator />} />
            <Route path="qr-generator" element={<QRGenerator />} />
          </Route>
          
          <Route 
            path="/cards" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Qrcode />
              </motion.div>
            } 
          />
          
          <Route 
            path="/demo/:slug" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DemoPage />
              </motion.div>
            } 
          />
          
          <Route 
            path="/contact" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ContactForm />
              </motion.div>
            } 
          />
          
          <Route 
            path="/subscribe" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SubscribeForm />
              </motion.div>
            } 
          />

          {/* Admin routes */}
          <Route
            path="/admin/login"
            element={
              token ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Login />
                </motion.div>
              )
            }
          />
          
          {/* <Route
            path="/admin"
            element={
              token ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AdminLayout />
                </motion.div>
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="demos" element={<DemoList />} />
            <Route path="demos/:slug/edit" element={<DemoEditor />} />
            <Route path="feedbacks" element={<FeedbackList />} />
            <Route path="proposals" element={<ProposalList />} />
          </Route> */}

          {/* 404 fallback */}
          <Route 
            path="*" 
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <NotFound />
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default AppWrapper;