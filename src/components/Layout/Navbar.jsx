import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser, FiMenu, FiX, FiBell, FiMessageSquare } from 'react-icons/fi';

const Navbar = ({ user, toggleSidebar, isSidebarOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-sm w-full py-3 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40"
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
        >
          {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        
        <Link to="/" className="text-xl font-bold text-blue-600 hidden md:block">
          ScanMeAI
        </Link>
      </div>

      <div className="flex items-center space-x-3 md:space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <FiBell size={18} className="text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <FiMessageSquare size={18} className="text-gray-600" />
        </button>
        
        <motion.div whileHover={{ scale: 1.05 }} className="relative group">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <FiUser className="text-blue-600" />
            </div>
            <span className="hidden md:inline text-sm font-medium text-gray-700">
              {user?.name || 'User'}
            </span>
          </div>
          
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
            <div className="px-4 py-2 text-sm text-gray-700 border-b">
              <p className="font-medium">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <FiLogOut className="mr-2" /> Sign out
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;