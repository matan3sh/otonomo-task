import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { CarContextProvider } from './context/carContext';

ReactDOM.render(
  <React.StrictMode>
    <CarContextProvider>
      <App />
    </CarContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
