import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoAPI, versionAPI } from '../services/mainApi';
import { removeAuthToken } from '../services/auth';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import DemoItemCard from '../components/Dashboard/DemoItemCard';
import CreateDemoItem from '../components/Dashboard/CreateDemoItem';
import TTSGenerator from '../components/Dashboard/TTSGenerator';
import QRGenerator from '../components/Dashboard/QRGenerator';
import DemoItemDetails from '../components/Dashboard/DemoItemDetails'; // New component
import { theme } from '../styles/theme';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [demoItems, setDemoItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTTSModal, setShowTTSModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // New state
  const [selectedItem, setSelectedItem] = useState(null);
  const [features, setFeatures] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, featuresRes] = await Promise.all([
          demoAPI.getDemoItems(),
          versionAPI.getFeatures()
        ]);
        
        setDemoItems(itemsRes.data.items);
        setFeatures(featuresRes.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    removeAuthToken();
    navigate('/');
  };

  const handleCreateItem = async (itemData) => {
    try {
      const response = await demoAPI.createDemoItem(itemData);
      setDemoItems([...demoItems, response.data]);
      setShowCreateModal(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create demo item');
    }
  };

  const handleGenerateTTS = async (data) => {
    try {
      const response = await demoAPI.generateTTS({
        demoItemId: selectedItem._id,
        ...data
      });
      
      setDemoItems(demoItems.map(item => 
        item._id === selectedItem._id ? { ...item, ...response.data } : item
      ));
      
      setShowTTSModal(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate TTS');
    }
  };

  const handleGenerateQR = async () => {
    try {
      const response = await demoAPI.generateQR({
        demoItemId: selectedItem._id
      });
      
      setDemoItems(demoItems.map(item => 
        item._id === selectedItem._id ? { ...item, ...response.data } : item
      ));
      
      setShowQRModal(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate QR code');
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="flex flex-1">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          remainingDemos={3 - demoItems.length}
        />
        
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  My Demo Items
                </h1>
                <p className="text-gray-500 mt-1">
                  {demoItems.length} of 3 items created
                </p>
              </motion.div>
              
              {demoItems.length < 3 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreateModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Item
                </motion.button>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-600 rounded-lg flex items-start gap-3"
              >
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>{error}</div>
              </motion.div>
            )}

            {/* Content Area */}
            <AnimatePresence>
              {demoItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No demo items yet</h3>
                  <p className="text-gray-500 mb-6">Create your first demo item to get started</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all"
                  >
                    Create Demo Item
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {demoItems.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      exit={{ opacity: 0 }}
                      layout
                    >
                      <DemoItemCard
                        item={item}
                        onGenerateTTS={() => {
                          setSelectedItem(item);
                          setShowTTSModal(true);
                        }}
                        onGenerateQR={() => {
                          setSelectedItem(item);
                          setShowQRModal(true);
                        }}
                        onViewDetails={() => handleViewDetails(item)}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateDemoItem
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateItem}
            wordLimit={300}
            remainingDemos={3 - demoItems.length}
          />
        )}
        
        {showTTSModal && selectedItem && (
          <TTSGenerator
            item={selectedItem}
            onClose={() => setShowTTSModal(false)}
            onSubmit={handleGenerateTTS}
          />
        )}
        
        {showQRModal && selectedItem && (
          <QRGenerator
            item={selectedItem}
            onClose={() => setShowQRModal(false)}
            onSubmit={handleGenerateQR}
          />
        )}

        {/* New Details Modal */}
        {showDetailsModal && selectedItem && (
          <DemoItemDetails
            item={selectedItem}
            onClose={() => setShowDetailsModal(false)}
            onGenerateTTS={() => {
              setShowDetailsModal(false);
              setShowTTSModal(true);
            }}
            onGenerateQR={() => {
              setShowDetailsModal(false);
              setShowQRModal(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;