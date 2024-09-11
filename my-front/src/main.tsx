// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// Styles
import './index.css';

// Store
import store from './store';

// App
import App from './App.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);