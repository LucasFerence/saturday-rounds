import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppTwo from './AppTwo';
import reportWebVitals from './reportWebVitals';
import {Auth0Provider} from '@auth0/auth0-react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

      <BrowserRouter>

        <Auth0Provider
          domain="dev-fkh-ll2p.us.auth0.com"
          clientId="aDmrCoY20lxhQOi7GDkq5pRLrfJU2mf9"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: 'http://localhost:5050',
          }}
        >

          <Routes>
            <Route path="/" element={
              <App />
            }/>

            <Route path="/v2" element={
              <AppTwo />
            }/>
          </Routes>

        </Auth0Provider>

      </BrowserRouter>

    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
