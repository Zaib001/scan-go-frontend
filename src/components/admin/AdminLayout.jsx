import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <AdminNavbar />

        {/* Page content */}
        <main className="p-6 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
