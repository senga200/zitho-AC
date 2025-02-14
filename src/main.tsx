import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FilterContextProvider } from './store/FilterContext';
import { AuthProvider } from './store/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
    </AuthProvider>
  </StrictMode>,
)
