import { motion } from 'framer-motion';

const Card = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl shadow-md overflow-hidden ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;