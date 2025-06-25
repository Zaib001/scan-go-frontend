import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">Scan & Go</Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">Admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
