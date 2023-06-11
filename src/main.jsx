import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { CarnavalApp } from './CarnavalApp'
import './styles.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CarnavalApp/>
    </BrowserRouter>
  </React.StrictMode>,
);
