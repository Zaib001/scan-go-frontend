import { useEffect, useState } from 'react';
import { getAllProposals, updateProposalStatus } from '../../services/proposalService';
import { formatDate } from '../../utils/helpers';
import { motion } from 'framer-motion';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

const ProposalTable = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAllProposals();
      setProposals(res.data || []);
    })();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateProposalStatus(id, status);
    setProposals((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status } : p))
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Proposals</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-indigo-50 text-indigo-700 text-left">
            <tr>
              <th className="px-4 py-2 border">Curator</th>
              <th className="px-4 py-2 border">Demo</th>
              <th className="px-4 py-2 border">Proposed Changes</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {proposals.map((p, index) => (
              <motion.tr
                key={p._id}
                className="hover:bg-gray-50 border-b"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <td className="px-4 py-2 border">{p.curatorKey}</td>
                <td className="px-4 py-2 border">{p.demoSlug}</td>
                <td
                  className="px-4 py-2 border max-w-sm truncate"
                  title={p.proposedChanges}
                >
                  {p.proposedChanges}
                </td>
                <td className="px-4 py-2 border">
                  <select
                    value={p.status || 'pending'}
                    onChange={(e) => handleStatusChange(p._id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded border bg-white ${statusColors[p.status] || ''}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-4 py-2 border">{formatDate(p.createdAt)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProposalTable;
