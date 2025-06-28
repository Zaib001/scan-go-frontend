import { useEffect, useState } from 'react';
import { getAllDemos } from '../../services/demoService';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Qrcode = () => {
  const [demos, setDemos] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAllDemos();
      setDemos(res.data || []);
    })();
  }, []);

  return (
    <div>
      {/* Demo Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {demos.map((demo, index) => (
          <motion.div
            key={demo._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.4, ease: 'easeOut' }}
            className="bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-6"
          >
            <Link to={`/demo/${demo.slug}`} className="block h-full">
              <h3 className="text-xl font-semibold text-indigo-800">{demo.title}</h3>
              <p className="text-sm text-gray-500 capitalize mt-1 mb-4">{demo.type}</p>

              {/* QR Code */}
              {typeof demo.qrCodeUrl === 'string' &&
                demo.qrCodeUrl.trim().startsWith('data:image') && (
                  <div className="mt-4 flex flex-col items-center">
                    <p className="text-xs text-gray-400 mb-1">Scan QR to view</p>
                    <img
                      src={demo.qrCodeUrl.trim()}
                      alt="QR Code"
                      className="w-36 h-36 object-contain border border-gray-300 rounded-lg p-2 bg-gray-50"
                    />
                  </div>
                )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Qrcode;
