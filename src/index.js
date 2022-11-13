import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from 'react-dom/client';
import './index.css';
import './Style/Style.css';
import App from './App';
import Navbar from './Component/Navbar';
import { UserContextProvider } from './Contex/User-contex';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          {/* <Navbar /> */}
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>
);
