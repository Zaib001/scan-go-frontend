import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public pages
import Home from './pages/user/Home';
import DemoPage from './pages/user/DemoPage';
import NotFound from './pages/user/NotFound';

// Admin layout + pages
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import DemoList from './pages/admin/DemoList';
import FeedbackList from './pages/admin/FeedbackList';
import ProposalList from './pages/admin/ProposalList';
import DemoEditor from './pages/admin/DemoEditor';
import Login from './pages/admin/Login';

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/demo/:slug" element={<DemoPage />} />
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

export default App;
