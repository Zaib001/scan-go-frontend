import { useEffect, useState } from 'react';
import { getAllFeedbacks, updateFeedbackStatus } from '../../services/feedbackService';
import { formatDate } from '../../utils/helpers';
import { motion } from 'framer-motion';

const statusColors = {
  new: 'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  contacted: 'bg-green-100 text-green-800',
};

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAllFeedbacks();
      setFeedbacks(res.data || []);
    })();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateFeedbackStatus(id, newStatus);
    setFeedbacks((prev) =>
      prev.map((f) => (f._id === id ? { ...f, status: newStatus } : f))
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Feedback Submissions</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-indigo-50 text-indigo-700">
            <tr>
              <th className="px-4 py-2 border text-left">Name</th>
              <th className="px-4 py-2 border text-left">Email</th>
              <th className="px-4 py-2 border text-left">Interest</th>
              <th className="px-4 py-2 border text-left">Status</th>
              <th className="px-4 py-2 border text-left">Date</th>
              <th className="px-4 py-2 border text-left">Update</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f, index) => (
              <motion.tr
                key={f._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="hover:bg-gray-50 border-b"
              >
                <td className="px-4 py-2 border">{f.name}</td>
                <td className="px-4 py-2 border">{f.email}</td>
                <td className="px-4 py-2 border">{f.businessInterest}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`text-xs px-2 py-1 rounded ${statusColors[f.status || 'new']}`}
                  >
                    {f.status || 'new'}
                  </span>
                </td>
                <td className="px-4 py-2 border">{formatDate(f.createdAt)}</td>
                <td className="px-4 py-2 border">
                  <select
                    value={f.status || 'new'}
                    onChange={(e) => handleStatusChange(f._id, e.target.value)}
                    className="text-xs border rounded px-2 py-1 bg-white"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                  </select>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;
