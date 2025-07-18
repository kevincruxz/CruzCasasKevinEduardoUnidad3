import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Ayuda from './Components/Ayuda/index.jsx'
import Contacto from './Components/Contacto/index.jsx'
import Buzon from './Components/Buzon/index.jsx'
import SuccessPage from './Components/SuccessPage/index.jsx'
import PasswordOlvidado from './Components/PasswordOlvidado/index.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/ayuda', element: <Ayuda />},
  {path: '/contacto', element: <Contacto />},
  {path: '/buzon', element: <Buzon />},
  {path: '/exito', element: <SuccessPage />},
  {path: '/contraseña_olvidada', element: <PasswordOlvidado />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
