import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import DemoList from '../pages/admin/DemoList';
import FeedbackList from '../pages/admin/FeedbackList';
import ProposalList from '../pages/admin/ProposalList';
import DemoEditor from '../pages/admin/DemoEditor';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="demos" element={<DemoList />} />
        <Route path="demos/:slug/edit" element={<DemoEditor />} />
        <Route path="feedbacks" element={<FeedbackList />} />
        <Route path="proposals" element={<ProposalList />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
