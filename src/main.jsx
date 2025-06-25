import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Toaster position="top-right" />
    <AuthProvider>
      <App />
    </AuthProvider>

  </React.StrictMode>
);

