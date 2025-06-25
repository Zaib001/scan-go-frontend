import { Routes, Route } from 'react-router-dom';
import Home from '../pages/user/Home';
import DemoPage from '../pages/user/DemoPage';
import NotFound from '../pages/user/NotFound';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo/:slug" element={<DemoPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;
