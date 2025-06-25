import { useState } from 'react';
import { submitFeedback } from '../../services/feedbackService';
import Toast from '../common/Toast';
import { validateFeedback } from '../../utils/validate';

const FeedbackForm = () => {
  const [form, setForm] = useState({ name: '', email: '', businessInterest: '', expectedPrice: '', message: '' });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFeedback(form);
    if (Object.keys(errors).length > 0) {
      setToast({ message: Object.values(errors)[0], type: 'error' });
      return;
    }

    try {
      await submitFeedback(form);
      setToast({ message: 'Thank you! Feedback submitted.', type: 'success' });
      setForm({ name: '', email: '', businessInterest: '', expectedPrice: '', message: '' });
    } catch {
      setToast({ message: 'Failed to submit feedback.', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      {['name', 'email', 'businessInterest', 'expectedPrice'].map((field) => (
        <input
          key={field}
          name={field}
          type="text"
          placeholder={field.replace(/([A-Z])/g, ' $1')}
          value={form[field]}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      ))}
      <textarea
        name="message"
        placeholder="Additional Message (optional)"
        value={form.message}
        onChange={handleChange}
        rows={3}
        className="w-full p-2 border rounded"
      ></textarea>
      <button className="bg-blue-600 text-white px-5 py-2 rounded">Submit</button>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </form>
  );
};

export default FeedbackForm;
