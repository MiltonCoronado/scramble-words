import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ScrambleWords } from './ScrambleWords.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScrambleWords />
  </StrictMode>,
);
