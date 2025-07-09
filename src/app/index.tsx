import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@styles/index.css';
import '../styles/global.scss';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';

// React 앱을 DOM에 마운트
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 테마 프로바이더로 앱 전체에 테마 적용 */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);