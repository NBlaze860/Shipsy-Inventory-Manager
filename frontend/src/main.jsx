/**
 * Application Entry Point
 * 
 * Main entry file that initializes the React application with Redux state management
 * and renders the root App component. Sets up the application foundation with
 * strict mode for development warnings and global state provider.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import App from './App.jsx';

// Initialize React application with Redux store and strict mode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Redux Provider makes store available to all components */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
