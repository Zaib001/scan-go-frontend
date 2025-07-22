import { motion } from 'framer-motion';
import { useState } from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Optional: handle successful login/signup
  const handleSuccess = (user) => {
    console.log('Auth successful:', user);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4"
    >
      <motion.div
        key={isLogin ? 'login' : 'signup'}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white p-8 rounded-lg">
            {isLogin ? (
              <Login
                onSuccess={handleSuccess}
                onSwitchToSignup={() => setIsLogin(false)}
              />
            ) : (
              <Signup
                onSuccess={handleSuccess}
                onSwitchToLogin={() => setIsLogin(true)}
              />
            )}

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Log in'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Auth;
