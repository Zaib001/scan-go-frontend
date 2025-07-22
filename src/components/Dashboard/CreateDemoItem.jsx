import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Input from '../Ui/Input';
import Button from '../UI/Button';
const CreateDemoItem = ({ onClose, onSubmit, wordLimit, remainingDemos }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    textContent: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const wordCount = formData.textContent.split(/\s+/).length;
    if (wordCount > wordLimit) {
      setError(`Text content exceeds ${wordLimit} words`);
      return;
    }

    setLoading(true);
    onSubmit(formData)
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-xl shadow-xl w-full max-w-md"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Create New Demo Item</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Item Name"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
              />

              <Input
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />

              <Input
                label={`Text Content (${formData.textContent.split(/\s+/).length}/${wordLimit} words)`}
                name="textContent"
                textarea
                value={formData.textContent}
                onChange={handleChange}
                rows={5}
                required
              />

              <div className="pt-2">
                <p className="text-sm text-gray-500">
                  You have {remainingDemos} demo items remaining in your free plan.
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="secondary"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  loading={loading}
                >
                  Create Item
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateDemoItem;