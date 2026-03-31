import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import interRegular from '@assets/fonts/Inter-Regular.ttf';
import interMedium from '@assets/fonts/Inter-Medium.ttf';
import interSemiBold from '@assets/fonts/Inter-SemiBold.ttf'; 

const loadFont = (name: string, url: string, weight: number) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  const finalUrl = isProduction 
    ? url.replace(/\.ttf$/i, '.woff2') 
    : url;

  const fontFace = new FontFace(name, `url(${finalUrl})`, {
    weight: String(weight),
    style: 'normal',
    display: 'swap'
  });
  document.fonts.add(fontFace);
  fontFace.load().catch((err) => console.warn(`Font ${name} failed`, err));
};

loadFont('Inter', interRegular, 400);
loadFont('Inter', interMedium, 500);
loadFont('Inter', interSemiBold, 600); 

const container = document.getElementById('root');
if (!container) throw new Error('Root not found');
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);