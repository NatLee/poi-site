import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { applyTheme } from './lib/theme.ts';
import site from './site.config.ts';

applyTheme(site, document.documentElement);

const root = document.getElementById('root');
if (!root) throw new Error('index.html needs a <div id="root"></div>');

createRoot(root).render(
  <StrictMode>
    <App site={site} />
  </StrictMode>,
);
