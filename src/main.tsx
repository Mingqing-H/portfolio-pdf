import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource/inter-tight/latin-500.css';
import '@fontsource/inter-tight/latin-700.css';
import App from './App';
import './styles.css';
import './portfolio.css';

const root = document.getElementById('root')!;
const app = <React.StrictMode><App /></React.StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);

