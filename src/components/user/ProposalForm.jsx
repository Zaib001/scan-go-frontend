import { useState } from 'react';
import { submitProposal } from '../../services/proposalService';
import Toast from '../common/Toast';
import { validateProposal } from '../../utils/validate';

const ProposalForm = ({ curatorKey, demoSlug }) => {
  const [text, setText] = useState('');
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateProposal(text);
    if (error) return setToast({ message: error, type: 'error' });

    try {
      await submitProposal(curatorKey, { demoSlug, proposedChanges: text });
      setToast({ message: 'Proposal submitted successfully.', type: 'success' });
      setText('');
    } catch {
      setToast({ message: 'Failed to submit proposal.', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block text-sm font-medium">Suggest a content improvement</label>
      <textarea
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your suggestion..."
        className="w-full p-3 border rounded"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit Proposal</button>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </form>
  );
};

export default ProposalForm;
