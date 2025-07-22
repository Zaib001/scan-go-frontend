import { motion } from 'framer-motion';
import { useState } from 'react';
import { authAPI } from '../../services/mainApi';
import { setAuthToken } from '../../services/auth';
import Button from '../UI/Button';
import Input from '../Ui/Input';

const Signup = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    subscribeToNewsletter: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.signup(formData);
      setAuthToken(response.data.token);
      onSuccess(response.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-1">Create Account</h2>
        <p className="text-gray-500">Join us to start creating your demo items</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />

        <div className="flex items-center space-x-2">
          <input
            id="subscribe"
            name="subscribeToNewsletter"
            type="checkbox"
            checked={formData.subscribeToNewsletter}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="subscribe" className="text-sm text-gray-700">
            Subscribe to our newsletter
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>

     
    </motion.div>
  );
};

export default Signup;
