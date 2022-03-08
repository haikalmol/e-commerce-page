import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ItemContextProvider } from './context/ItemContext';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ItemContextProvider>
        <App />
      </ItemContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
