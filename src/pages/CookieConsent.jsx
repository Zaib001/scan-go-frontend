import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const CookieConsent = ({ onConsent = () => {} }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  const toggleOption = (option) => {
    if (option === 'necessary') return;
    setSelectedOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

   const handleConsent = (type) => {
    if (typeof onConsent === 'function') {
      if (type === 'custom') {
        onConsent(selectedOptions);
      } else {
        onConsent(type);
      }
    } else {
      console.error('onConsent is not a function');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-50"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Cookie Preferences
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies to enhance your experience. Choose which cookies you allow.
                </p>

                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 mb-4">
                        {Object.entries(selectedOptions).map(([key, value]) => (
                          <motion.div
                            key={key}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            whileHover={{ scale: 1.01 }}
                          >
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                {key} Cookies
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {key === 'necessary'
                                  ? 'Essential for the website to function'
                                  : key === 'analytics'
                                  ? 'Help us understand how visitors interact'
                                  : 'Used for personalized advertising'}
                              </p>
                            </div>
                            <button
                              onClick={() => toggleOption(key)}
                              className={`relative w-12 h-6 rounded-full p-1 transition-colors ${
                                value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              disabled={key === 'necessary'}
                            >
                              <motion.span
                                className="block w-4 h-4 rounded-full bg-white shadow-md"
                                animate={{ x: value ? 24 : 0 }}
                                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                              />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setExpanded(!expanded)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                {expanded ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <motion.button
                onClick={() => handleConsent('accepted')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Accept All
              </motion.button>
              <motion.button
                onClick={() => handleConsent('rejected')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg font-medium"
              >
                Reject All
              </motion.button>
              {expanded && (
                <motion.button
                  onClick={() => handleConsent('custom')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg font-medium"
                >
                  Save Preferences
                </motion.button>
              )}
              {!expanded && (
                <motion.button
                  onClick={() => setExpanded(true)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 rounded-lg font-medium"
                >
                  Customize
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieConsent;