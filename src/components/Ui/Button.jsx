import { motion } from 'framer-motion';

const Button = ({ children, className = '', onClick, disabled = false, type = 'button' }) => {
  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-4 py-2 font-medium transition-colors ${className} ${
        disabled ? 'bg-gray-300 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </motion.button>
  );
};

export default Button;