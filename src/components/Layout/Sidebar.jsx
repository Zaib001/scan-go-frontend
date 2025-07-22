import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiLayers, FiMic, FiCode, FiSettings, FiZap } from 'react-icons/fi';

const sidebarItems = [
  { path: '/app/dashboard', icon: <FiHome size={18} />, label: 'Dashboard' },
  { path: '/app/demo-items', icon: <FiLayers size={18} />, label: 'Demo Items' },
  { path: '/app/tts-generator', icon: <FiMic size={18} />, label: 'TTS Generator' },
  { path: '/app/qr-generator', icon: <FiCode size={18} />, label: 'QR Generator' },
  { path: '/app/create-demo', icon: <FiZap size={18} />, label: 'Create Demo' },
  { path: '/app/settings', icon: <FiSettings size={18} />, label: 'Settings' },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 ${isOpen ? 'block' : 'hidden md:block'}`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">YourLogo</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-colors ${
                      isActive || location.pathname.startsWith(item.path)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                  onClick={toggleSidebar}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <div className="text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Your Company</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;