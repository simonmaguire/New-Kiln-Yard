import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router'
import { AuthContextProvider } from './AuthContext.tsx'
import { PotteryCollectionPage } from'./pages/PotteryCollection.tsx'
import { PotteryNotePage } from './pages/PotteryNotePage.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import { AuthPage } from './pages/AuthPage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const router = createBrowserRouter([
  { path: '/', element: <App />, children: [
    { path: 'auth', element: <AuthPage /> },
    {element: <ProtectedRoute/>, children: [
      { path: 'pottery', element: <PotteryCollectionPage /> },
      { path: 'pot', element: <PotteryNotePage/>}
    ]},
  ]}
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>,
)
