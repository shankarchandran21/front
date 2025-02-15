import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
createRoot(document.getElementById('root')).render(_jsx(BrowserRouter, { children: _jsx(Provider, { store: store, children: _jsx(StrictMode, { children: _jsx(App, {}) }) }) }));
