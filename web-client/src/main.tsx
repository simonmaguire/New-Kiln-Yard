import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router'
import { AuthContextProvider } from './pages/Auth.tsx'
import { PotteryCollectionPage } from'./pages/PotteryCollection.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import { AuthPage } from './pages/AuthPage.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { path: 'auth', element: <AuthPage /> },
    {element: <ProtectedRoute/>, children: [
      { path: 'pottery', element: <PotteryCollectionPage /> },
    ]},
  ]}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
)
