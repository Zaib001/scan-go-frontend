import { useEffect, useState } from 'react';
import { getAllDemos } from '../../services/demoService';
import DemoForm from './DemoForm';
import { motion } from 'framer-motion';

const DemoTable = () => {
  const [demos, setDemos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchDemos = async () => {
    const res = await getAllDemos();
    setDemos(res.data || []);
  };

  useEffect(() => {
    fetchDemos();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-indigo-700">All Demos</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition"
        >
          + Create Demo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700 border border-gray-200 rounded-lg">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Slug</th>
              <th className="px-4 py-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {demos.map((demo) => (
              <tr key={demo._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{demo.title}</td>
                <td className="px-4 py-2 capitalize">{demo.type}</td>
                <td className="px-4 py-2">{demo.slug}</td>
                <td className="px-4 py-2">{new Date(demo.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-black/30 flex items-center justify-center"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-indigo-700 mb-4">Create New Demo</h3>
            <DemoForm
              onSave={() => {
                fetchDemos();
                setShowModal(false);
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DemoTable;
