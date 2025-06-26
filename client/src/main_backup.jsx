import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { ThemeProvider } from './ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
