import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaFileAlt,
  FaComments,
  FaClipboardList,
  FaBars,
  FaSignOutAlt,
} from 'react-icons/fa';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all ${
      isActive
        ? 'bg-indigo-100 text-indigo-700 font-semibold'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } min-h-screen bg-white border-r transition-all duration-300 shadow-sm flex flex-col justify-between`}
    >
      {/* Top section */}
      <div className="p-4">
        {/* Toggle */}
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-indigo-600 transition mb-6"
        >
          <FaBars size={20} />
        </button>

        {/* Nav Links */}
        <nav className="space-y-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <FaTachometerAlt />
            {!collapsed && 'Dashboard'}
          </NavLink>
          <NavLink to="/admin/demos" className={linkClass}>
            <FaFileAlt />
            {!collapsed && 'Demo Pages'}
          </NavLink>
          <NavLink to="/admin/proposals" className={linkClass}>
            <FaClipboardList />
            {!collapsed && 'Proposals'}
          </NavLink>
          <NavLink to="/admin/feedbacks" className={linkClass}>
            <FaComments />
            {!collapsed && 'Feedback'}
          </NavLink>
        </nav>
      </div>

      {/* Bottom section - Logout */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-sm text-red-600 hover:text-red-700 w-full px-4 py-2 rounded-lg hover:bg-red-50 transition"
        >
          <FaSignOutAlt />
          {!collapsed && 'Logout'}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
