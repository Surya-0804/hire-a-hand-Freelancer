// main.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom'; // Import createRoot
import App from './App';
import './index.css';
import { AuthProvider } from './firebase/AuthContext';

// Create a root and render the App component
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    
  </React.StrictMode>
  
);
